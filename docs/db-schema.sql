-- Database Schema for Groomwear Rental Platform
-- Market: France (Handles TVA, specialized statuses)

-- Enum for Costume Status
CREATE TYPE costume_status AS ENUM (
    'READY',        -- Prêt pour location
    'RENTED',       -- Actuellement chez un client
    'TRANSIT',      -- En cours de transport (Aller ou Retour)
    'CLEANING',     -- Au pressing
    'MAINTENANCE',  -- En réparation
    'RETIRED'       -- Déclassé (fin de cycle de vie)
);

-- Enum for Rental Status
CREATE TYPE rental_status AS ENUM (
    'PENDING',      -- En attente de paiement/validation
    'CONFIRMED',    -- Confirmée
    'SHIPPED',      -- Expédiée
    'DELIVERED',    -- Livrée
    'RETURNED',     -- Retournée par le client
    'COMPLETED',    -- Terminé (après pressing et contrôle)
    'CANCELLED'     -- Annulée
);

-- Products table (Catalogue)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price_cents INTEGER NOT NULL, -- Price in cents (EUR)
    security_deposit_cents INTEGER NOT NULL,
    fit_type VARCHAR(50), -- Slim, Regular, Tailored
    fabric_composition TEXT,
    image_urls TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inventory table (Tracking individual physical suits)
CREATE TABLE inventory_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    sku VARCHAR(100) UNIQUE NOT NULL,
    size VARCHAR(20) NOT NULL,
    current_status costume_status DEFAULT 'READY',
    rentals_count INTEGER DEFAULT 0, -- Track number of rentals for lifecycle management
    max_rentals INTEGER DEFAULT 20, -- Decommissioning threshold
    last_cleaned_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    measurements JSONB, -- {chest: 100, waist: 85, etc.}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Rentals table
CREATE TABLE rentals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    inventory_item_id UUID REFERENCES inventory_items(id),
    event_date DATE NOT NULL,
    delivery_date DATE NOT NULL, -- D-2
    return_date DATE NOT NULL,   -- D+1
    status rental_status DEFAULT 'PENDING',
    stripe_payment_intent_id VARCHAR(255),
    stripe_deposit_hold_id VARCHAR(255),
    total_price_cents INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Availability tracking (View or Index optimization)
CREATE INDEX idx_rentals_dates ON rentals (delivery_date, return_date);
CREATE INDEX idx_inventory_status ON inventory_items (current_status);

-- Lifecycle trigger example (simplified logic)
-- To be called after rental completion to increment count and potentially retire item
CREATE OR REPLACE FUNCTION increment_rental_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE inventory_items
    SET rentals_count = rentals_count + 1,
        current_status = CASE
            WHEN rentals_count + 1 >= max_rentals THEN 'RETIRED'::costume_status
            ELSE 'CLEANING'::costume_status
        END
    WHERE id = NEW.inventory_item_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
