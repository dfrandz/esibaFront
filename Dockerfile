# Étape de build
FROM node:20-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Étape de production
FROM nginx:alpine

# Supprimer la configuration par défaut de NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers construits de l'étape précédente dans le conteneur NGINX
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Commande de démarrage du serveur NGINX
CMD ["nginx", "-g", "daemon off;"]