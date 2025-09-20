const quizzes = {
    'quiz-programacao': [
        {
            question: "Qual linguagem de programação é frequentemente utilizada para estilizar páginas web?",
            options: ["JavaScript", "HTML", "CSS", "Python"],
            answer: "CSS"
        },
        {
            question: "O que significa a sigla HTML?",
            options: ["HyperText Markup Language", "High-Level Text Management Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
            answer: "HyperText Markup Language"
        },
        {
            question: "Qual dos seguintes é um sistema de gerenciamento de banco de dados (SGBD) muito comum?",
            options: ["React", "PHP", "MySQL", "Visual Studio Code"],
            answer: "MySQL"
        },
        {
            question: "Em desenvolvimento web, o que o termo 'front-end' geralmente se refere?",
            options: ["A parte do sistema que interage com o banco de dados.", "O lado do servidor de uma aplicação.", "A interface do usuário e tudo o que ele vê e interage.", "A lógica de negócios da aplicação."],
            answer: "A interface do usuário e tudo o que ele vê e interage."
        },
        {
            question: "Qual dos seguintes é um framework JavaScript popular para construir interfaces de usuário?",
            options: ["Django", "Laravel", "React", "Spring"],
            answer: "React"
        },
        {
            question: "O que é um 'bug' em programação?",
            options: ["Um tipo de erro de sintaxe.", "Um recurso não documentado.", "Um pequeno inseto encontrado no código.", "Um erro ou falha no software que causa um comportamento inesperado."],
            answer: "Um erro ou falha no software que causa um comportamento inesperado."
        },
        {
            question: "Qual é a principal função do Git em um projeto de software?",
            options: ["Executar o código.", "Testar a segurança do sistema.", "Controlar versões do código-fonte.", "Criar a interface de usuário."],
            answer: "Controlar versões do código-fonte."
        },
        {
            question: "Qual das seguintes linguagens é conhecida por sua versatilidade e é usada tanto em back-end quanto em front-end?",
            options: ["Java", "C#", "Ruby", "JavaScript"],
            answer: "JavaScript"
        },
        {
            question: "O que um desenvolvedor back-end é responsável por criar?",
            options: ["O design visual e a experiência do usuário.", "A lógica do servidor, bancos de dados e APIs.", "A otimização para motores de busca (SEO).", "Os scripts de animação no navegador."],
            answer: "A lógica do servidor, bancos de dados e APIs."
        },
        {
            question: "Em um contexto de programação, o que é uma variável?",
            options: ["Um programa que testa o código.", "Um valor que nunca muda.", "Um nome que armazena um valor em um espaço de memória.", "Um comando para imprimir texto na tela."],
            answer: "Um nome que armazena um valor em um espaço de memória."
        }
    ],

    'quiz-escola': [
        {
            question: "Qual professor do curso Analise e Desenvolvimento de Sistemas foi seu favorito?",
            options: ["Cleviton", "Alison", "Mônica", "Jesus"],
        },
        {
            question: "Qual foi sua matéria favorita do curso?",
            options: ["Front-End", "Segurança de Softwares", "Banco de Dados", "Algoritmo", "Nenhuma delas."],
        },
        {
            question: "O que achou do curso ao longo desses 3 longos anos?",
            options: ["1-3 péssimo", "4-8 bom", "9-10 incrível"],
        },
        {
            question: "Qual diretor/vice-diretor foi seu favorito?",
            options: ["Ana Lúcia", "Sílvio", "Pedro", "Cristine(baby's)", "Margareth"],
        },
        {
            question: "Qual professor de matérias gerais é seu favorito?",
            options: ["Marlos(sociologia)", "Thiago(história)", "Karol(artes)", "Francisco(física)", "Nenhum deles."],
        },
    ],

    'quiz-pessoal': [
        {
            question: "O que irá fazer após a formatura?",
            options: ["Faculdade", "Trabalhar em tempo integral", "Abrir meu próprio negócio", "Nenhuma das respostas acima"],
        },
        {
            question: "Irá trabalhar com a área do curso?",
            options: ["Nunca", "Talvez..", "Sim", "Não tenho certeza"],
        },
        {
            question: "Pretende fazer o enem",
            options: ["Sim", "Não"],
        },
        {
            question: "O que te deixa mais ansioso sobre o futuro?",
            options: ["Encontrar um emprego", "Estar em uma profissão que não gosto", "Não ter tempo para a família", "A incerteza do futuro"],
        },
        {
            question: "Caso não trabalhe nessa área de tecnologia, pensa em trabalhar em qual área?",
            options: ["Irei trabalhar na mesma área do curso", "Saúde e bem-estar", "Artes e comunicação", "Negócios e empreendedorismo", "Nenhuma das áreas acima"],
        }
    ]
};

function Quiz() {
    const [currentQuizId, setCurrentQuizId] = React.useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [showResults, setShowResults] = React.useState(false);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);
    const [isAnswered, setIsAnswered] = React.useState(false);
    const [quizQuestionClasses, setQuizQuestionClasses] = React.useState("question-container fade-in");
    const [isPersonalQuiz, setIsPersonalQuiz] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [answers, setAnswers] = React.useState([]);

    React.useEffect(() => {
        const handleStartQuiz = async (e) => {
            e.preventDefault();
            const btn = e.target.closest('.btn-start-quiz');
            const card = btn.closest('.quiz-card');
            const quizId = card.dataset.quizId;

            const nameInput = document.getElementById('user-name');
            const name = nameInput.value.trim();
            const errorMessage = document.getElementById('error-message');
            
            btn.textContent = "Fazer Quiz";
            btn.classList.remove('btn-quiz-done');
            btn.classList.add('btn-quiz-start');
            btn.disabled = false;
            
            if (!name) {
                errorMessage.textContent = "Por favor, digite seu nome para começar.";
                errorMessage.classList.remove('d-none');
                return;
            }

            let checkQuizFile;
            if (quizId === 'quiz-programacao') {
                checkQuizFile = 'check_programacao.php';
            } else if (quizId === 'quiz-escola') {
                checkQuizFile = 'check_escola.php';
            } else if (quizId === 'quiz-pessoal') {
                checkQuizFile = 'check_pessoal.php';
            } else {
                console.error("ID do quiz inválido.");
                return;
            }

            try {
                const response = await fetch(checkQuizFile, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome: name })
                });

                if (!response.ok) {
                    throw new Error('Erro na verificação do quiz.');
                }

                const result = await response.json();

                if (result.hasTaken) {
                    errorMessage.textContent = "Não é possivel fazer um mesmo quiz novamente.";
                    errorMessage.classList.remove('d-none');
                    
                    btn.innerHTML = 'Quiz já feito <i class="fas fa-lock"></i>';
                    btn.classList.remove('btn-quiz-start');
                    btn.classList.add('btn-quiz-done');
                    btn.disabled = true;
                    
                    return;
                }
            } catch (error) {
                console.error("Erro ao verificar o quiz:", error);
                errorMessage.textContent = "Erro ao conectar com o servidor. Tente novamente.";
                errorMessage.classList.remove('d-none');
                return;
            }

            errorMessage.classList.add('d-none');
            const quizSelection = document.getElementById('quiz-selection-container');
            const quizRoot = document.getElementById('quiz-root');
            const userInfoContainer = document.getElementById('user-info-container');
            const rankingContainer = document.getElementById('ranking-container');
            
            if (quizSelection && quizRoot && userInfoContainer && rankingContainer) {
                quizSelection.classList.add('d-none');
                userInfoContainer.classList.add('d-none');
                rankingContainer.classList.add('d-none');
                quizRoot.classList.remove('d-none');
            }
            
            setUserName(name);
            setCurrentQuizId(quizId);
            setCurrentQuestionIndex(0);
            setScore(0);
            setShowResults(false);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setQuizQuestionClasses("question-container fade-in");
            setAnswers([]);
            
            const isPersonal = quizzes[quizId] && quizzes[quizId].length > 0 && quizzes[quizId][0].answer === undefined;
            setIsPersonalQuiz(isPersonal);
        };

        const buttons = document.querySelectorAll('.btn-start-quiz');
        buttons.forEach(btn => {
            btn.addEventListener('click', handleStartQuiz);
        });
        
        const nameInput = document.getElementById('user-name');
        nameInput.addEventListener('input', () => {
            document.getElementById('error-message').classList.add('d-none');
            buttons.forEach(btn => {
                btn.textContent = "Fazer Quiz";
                btn.classList.remove('btn-quiz-done');
                btn.classList.add('btn-quiz-start');
                btn.disabled = false;
            });
        });
        
        fetchAndDisplayRanking();

        return () => {
            buttons.forEach(btn => {
                btn.removeEventListener('click', handleStartQuiz);
            });
            nameInput.removeEventListener('input', () => {});
        };
    }, []);
    
    const fetchAndDisplayRanking = async () => {
        const rankingContainer = document.getElementById('ranking-container');
        const rankingTableBody = document.getElementById('ranking-table-body');

        if (!rankingContainer || !rankingTableBody) {
            console.error("Containers de ranking não encontrados.");
            return;
        }

        try {
            const response = await fetch('get_ranking.php');
            if (!response.ok) {
                throw new Error('Erro ao buscar o ranking.');
            }
            const rankingData = await response.json();
            
            if (rankingData.length > 0) {
                rankingContainer.classList.remove('d-none');
                rankingTableBody.innerHTML = '';
                
                rankingData.forEach((player, index) => {
                    const row = `
                        <tr>
                            <th scope="row">${index + 1}º</th>
                            <td>${player.nome}</td>
                            <td>${player.pontuacao} / ${quizzes['quiz-programacao'].length}</td>
                        </tr>
                    `;
                    rankingTableBody.innerHTML += row;
                });
            } else {
                rankingContainer.classList.add('d-none');
            }
        } catch (error) {
            console.error("Erro ao carregar o ranking:", error);
            rankingContainer.classList.add('d-none');
        }
    };


    const handleAnswerClick = (option) => {
        if (isAnswered) return;

        setIsAnswered(true);
        setSelectedAnswer(option);

        let newScore = score;
        let isCorrect = false;

        if (!isPersonalQuiz) {
            if (option === quizzes[currentQuizId][currentQuestionIndex].answer) {
                newScore = score + 1;
                setScore(newScore);
                isCorrect = true;
            }
        }
        
        const currentAnswer = {
            question: quizzes[currentQuizId][currentQuestionIndex].question,
            selectedOption: option,
            isCorrect: isCorrect,
            correctAnswer: isPersonalQuiz ? null : quizzes[currentQuizId][currentQuestionIndex].answer
        };
        
        const updatedAnswers = [...answers, currentAnswer];
        setAnswers(updatedAnswers);

        setQuizQuestionClasses("question-container fade-out");

        setTimeout(() => {
            const nextQuestion = currentQuestionIndex + 1;
            if (nextQuestion < quizzes[currentQuizId].length) {
                setCurrentQuestionIndex(nextQuestion);
                setSelectedAnswer(null);
                setIsAnswered(false);
                setQuizQuestionClasses("question-container fade-in");
            } else {
                setShowResults(true);
                sendQuizResults(newScore, updatedAnswers);
            }
        }, 800);
    };

    const sendQuizResults = async (finalScore, finalAnswers) => {
        let phpFile;
        if (currentQuizId === 'quiz-programacao') {
            phpFile = 'save_programacao.php';
        } else if (currentQuizId === 'quiz-escola') {
            phpFile = 'save_escola.php';
        } else if (currentQuizId === 'quiz-pessoal') {
            phpFile = 'save_pessoal.php';
        } else {
            console.error("ID do quiz inválido.");
            return;
        }

        const data = {
            nome: userName,
            respostas: finalAnswers
        };

        if (currentQuizId === 'quiz-programacao') {
            data.pontuacao = finalScore;
        }

        try {
            const response = await fetch(phpFile, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.success) {
                console.log("Respostas salvas com sucesso!");
                if (currentQuizId === 'quiz-programacao') {
                    fetchAndDisplayRanking();
                }
            } else {
                console.error("Erro ao salvar respostas:", result.message);
            }
        } catch (error) {
            console.error("Erro de conexão ao salvar respostas:", error);
        }
    };

    const restartQuiz = () => {
        const quizSelection = document.getElementById('quiz-selection-container');
        const quizRoot = document.getElementById('quiz-root');
        const userInfoContainer = document.getElementById('user-info-container');
        const rankingContainer = document.getElementById('ranking-container');
        const nameInput = document.getElementById('user-name');

        if (quizSelection && quizRoot && userInfoContainer && nameInput && rankingContainer) {
            quizSelection.classList.remove('d-none');
            userInfoContainer.classList.remove('d-none');
            quizRoot.classList.add('d-none');
            rankingContainer.classList.remove('d-none');
            nameInput.value = '';
        }
        
        setCurrentQuizId(null);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResults(false);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setQuizQuestionClasses("question-container fade-in");
        setIsPersonalQuiz(false);
        setAnswers([]);
    };

    if (!currentQuizId) {
        return null;
    }

    const currentQuiz = quizzes[currentQuizId];
    const currentQuestion = currentQuiz[currentQuestionIndex];

    return (
        <div className="card p-4">
            {showResults ? (
                <div>
                    <h2 className="text-center mb-4">Quiz Finalizado! 🎉</h2>
                    <p className="lead text-center">
                        {isPersonalQuiz ? "Obrigado por responder! Suas respostas foram salvas." : `Você acertou ${score} de ${currentQuiz.length} perguntas.`}
                    </p>
                    <div className="d-grid gap-2">
                        <button onClick={restartQuiz} className="btn btn-quiz-start mt-3">responder outro quiz</button>
                    </div>
                </div>
            ) : (
                <div key={currentQuestionIndex} className={quizQuestionClasses}>
                    <h5 className="card-title text-center mb-4">
                        Pergunta {currentQuestionIndex + 1} de {currentQuiz.length}
                    </h5>
                    <p className="card-text fs-5 mb-4">{currentQuestion.question}</p>
                    <div className="d-grid gap-2">
                        {currentQuestion.options.map((option, index) => {
                            let buttonClass = "btn my-2";
                            
                            if (isAnswered) {
                                if (!isPersonalQuiz) {
                                    if (option === currentQuestion.answer) {
                                        buttonClass += " btn-success";
                                    } else if (option === selectedAnswer) {
                                        buttonClass += " btn-danger";
                                    } else {
                                        buttonClass += " btn-disabled";
                                    }
                                } else {
                                    if (option === selectedAnswer) {
                                        buttonClass += " btn-selected";
                                    } else {
                                        buttonClass += " btn-disabled";
                                    }
                                }
                            } else {
                                buttonClass += " btn-quiz-start";
                            }

                            return (
                                <button 
                                    key={index} 
                                    className={buttonClass}
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={isAnswered}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<Quiz />, document.getElementById('quiz-root'));