PROJECT_NAME=${1:-"project-vape"}
git clone -b V-1.1.0 https://github.com/jviatge/vape.git .vape
node ./.vape/install/initFomSH.js $PROJECT_NAME
cd $PROJECT_NAME
pnpm install
pnpm generate
pnpm migrate