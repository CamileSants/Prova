<?php
header('Content-Type: application/json');


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quizzes";

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['nome']) || !isset($input['pontuacao'])) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos.']);
    exit;
}

$nome_usuario = $input['nome'];
$pontuacao = $input['pontuacao'];

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Checa a conexão
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Falha na conexão com o banco de dados: ' . $conn->connect_error]);
    exit;
}

// Prepara e executa a query SQL para inserir os dados
$stmt = $conn->prepare("INSERT INTO quizzes.quiz_programacao (nome_usuario, pontuacao) VALUES (?, ?)");
$stmt->bind_param("si", $nome_usuario, $pontuacao);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao inserir no banco de dados.']);
}

$stmt->close();
$conn->close();
?>