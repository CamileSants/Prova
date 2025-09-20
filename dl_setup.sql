-- Cria o banco de dados 'quizzes' se ele ainda não existir.
CREATE DATABASE IF NOT EXISTS `quizzes`;

-- Seleciona o banco de dados para que as próximas instruções o utilizem.
USE `quizzes`;

-- Remove a tabela 'quizzes_respostas' se ela já existir para evitar erros.
-- Isso é útil para recriar a tabela do zero se houver algum problema.
DROP TABLE IF EXISTS `quizzes_respostas`;

-- Cria a tabela 'quizzes_respostas' para armazenar os resultados dos quizzes.
CREATE TABLE `quizzes_respostas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome_usuario` VARCHAR(255) NOT NULL,
  `quiz_id` VARCHAR(100) NOT NULL,
  `pontuacao` INT NULL,
  `respostas_json` JSON,
  `data_submissao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Esta é a chave única que impede o usuário de responder o mesmo quiz duas vezes.
  -- Ela garante que a combinação de nome_usuario e quiz_id seja sempre única.
  UNIQUE KEY `idx_nome_quiz` (`nome_usuario`, `quiz_id`)
);