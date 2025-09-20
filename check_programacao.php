<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quizzes";

// Tenta obter o nome do usuário do JavaScript
$input = json_decode(file_get_contents('php://input'), true);
$nome_usuario = $input['nome'] ?? '';

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Checa a conexão
if ($conn->connect_error) {
    echo json_encode(['hasTaken' => false, 'message' => 'Falha na conexão com o banco de dados.']);
    exit;
}

// Prepara e executa a query SQL para verificar se o nome existe
$stmt = $conn->prepare("SELECT COUNT(*) AS count FROM quizzes.quiz_programacao WHERE nome_usuario = ?");
$stmt->bind_param("s", $nome_usuario);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

$hasTaken = ($row['count'] > 0);

echo json_encode(['hasTaken' => $hasTaken]);

$stmt->close();
$conn->close();
?>