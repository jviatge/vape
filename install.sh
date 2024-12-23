#git clone https://github.com/jviatge/vape.git .vape
PROJECT_NAME=${1:-"project-vape"}
node ./.vape/install/initFomSH.js $PROJECT_NAME
cd $PROJECT_NAME
pnpm install
pnpm generate
pnpm migrate