#!/bin/bash

# Função para verificar se o banco de dados está disponível
wait_for_db() {
  echo "Aguardando o banco de dados ficar disponível..."
  until npx prisma db push; do
    echo "Tentando novamente em 2 segundos..."
    sleep 2
  done
}

# Chame a função para esperar o banco de dados subir antes de executar o comando
wait_for_db