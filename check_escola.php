<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$conn = new mysqli("localhost", "root", "", "quizzes");

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => "Falha na conexão: " . $conn->connect_error]);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['nome'])) {
    echo json_encode(['success' => false, 'message' => 'Dados inválidos.']);
    exit();
}

$nome = $conn->real_escape_string($data['nome']);

$stmt = $conn->prepare("SELECT COUNT(*) FROM quiz_escola WHERE nome_usuario = ?");
$stmt->bind_param("s", $nome);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();
$conn->close();

echo json_encode(['hasTaken' => ($count > 0)]);
?>