<?php
header('Content-Type: application/json');


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quizzes";

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Checa a conexão e mostra o erro se ela falhar
if ($conn->connect_error) {
    echo json_encode(['error' => 'Falha na conexão com o banco de dados: ' . $conn->connect_error]);
    exit;
}

// Prepara e executa a query SQL para buscar e ordenar os dados
$sql = "SELECT nome_usuario, pontuacao FROM quizzes.quiz_programacao ORDER BY pontuacao DESC";
$result = $conn->query($sql);

// Checa se a query falhou e mostra o erro
if ($result === false) {
    echo json_encode(['error' => 'Erro na consulta SQL: ' . $conn->error]);
    exit;
}

$ranking = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $ranking[] = [
            'nome' => $row['nome_usuario'],
            'pontuacao' => $row['pontuacao']
        ];
    }
}

// Retorna os dados como JSON
echo json_encode($ranking);

$conn->close();
?>