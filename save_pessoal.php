<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$conn = new mysqli("localhost", "root", "", "quizzes");

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => "Falha na conexão: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['nome']) || !isset($data['respostas'])) {
    die(json_encode(['success' => false, 'message' => 'Dados inválidos.']));
}

$nome = $conn->real_escape_string($data['nome']);
$respostas = $data['respostas'];

$q1 = $conn->real_escape_string($respostas[0]['selectedOption'] ?? null);
$q2 = $conn->real_escape_string($respostas[1]['selectedOption'] ?? null);
$q3 = $conn->real_escape_string($respostas[2]['selectedOption'] ?? null);
$q4 = $conn->real_escape_string($respostas[3]['selectedOption'] ?? null);
$q5 = $conn->real_escape_string($respostas[4]['selectedOption'] ?? null);

$sql = "INSERT INTO quiz_pessoal (nome_usuario, q1_resposta, q2_resposta, q3_resposta, q4_resposta, q5_resposta) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $nome, $q1, $q2, $q3, $q4, $q5);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Respostas salvas com sucesso!']);
} else {
    if ($conn->errno == 1062) {
        echo json_encode(['success' => false, 'message' => 'Você já respondeu a este quiz.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao salvar: ' . $stmt->error]);
    }
}
$stmt->close();
$conn->close();
?>