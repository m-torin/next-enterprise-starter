source .env

doppler secrets download --token=$DOPPLER_TOKEN_PRISMA --no-file --format env > packages/prisma/.env
