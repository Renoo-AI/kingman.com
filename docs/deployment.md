# Plan de Déploiement CI/CD - Groomwear Luxe

Cette plateforme est conçue pour être déployée sur **Google Cloud Platform (GCP)** en utilisant **Cloud Run** pour le frontend/backend (Next.js) et **Cloud SQL** pour la base de données PostgreSQL.

## Architecture

- **Frontend/Backend** : Next.js 14 sur Google Cloud Run (Auto-scaling, HTTPS natif).
- **Base de données** : PostgreSQL sur Google Cloud SQL.
- **Stockage Images** : Google Cloud Storage (GCS) avec intégration `next/image`.
- **Paiements** : Stripe (Webhooks gérés via des routes API Cloud Run).

## Étapes de déploiement manuel

1. **Build de l'image Docker** :
   ```bash
   gcloud builds submit --tag gcr.io/[PROJECT-ID]/groomwear-app
   ```

2. **Déploiement sur Cloud Run** :
   ```bash
   gcloud run deploy groomwear-app \
     --image gcr.io/[PROJECT-ID]/groomwear-app \
     --platform managed \
     --region europe-west9 (Paris) \
     --allow-unauthenticated \
     --set-env-vars DATABASE_URL=[DB_URL],STRIPE_SECRET_KEY=[KEY]
   ```

## Pipeline CI/CD (GitHub Actions)

Un fichier `.github/workflows/deploy.yml` doit être configuré pour automatiser le déploiement à chaque push sur `main`.

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Google Auth
        uses: 'google-github-actions/auth@v2'
        with:
          credentials_json: '${{ secrets.GCP_SA_KEY }}'

      - name: Build and Push Container
        run: |-
          gcloud builds submit --tag gcr.io/${{ secrets.GCP_PROJECT_ID }}/groomwear-app

      - name: Deploy to Cloud Run
        run: |-
          gcloud run deploy groomwear-app \
            --image gcr.io/${{ secrets.GCP_PROJECT_ID }}/groomwear-app \
            --region europe-west9 \
            --platform managed
```

## Optimisations pour le marché français

- **CDN** : Utilisation de Cloud CDN avec des nodes à Paris et Lyon pour minimiser la latence.
- **Conformité RGPD** : Hébergement des données dans la région `europe-west9` (Paris).
- **TVA** : Calculateur de TVA intégré dans les fonctions serverless avant l'envoi vers Stripe.
