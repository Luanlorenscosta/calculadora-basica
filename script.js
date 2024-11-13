class Calculadora {
    constructor(displayElemento) {
        this.displayElemento = displayElemento;
        this.limpar();
    }

    limpar() {
        this.display = '0';
        this.atualizarDisplay();
    }

    apagar() {
        this.display = this.display.slice(0, -1) || '0';
        this.atualizarDisplay();
    }

    adicionarNumero(numero) {
        if (this.display === '0' && numero !== '.') {
            this.display = numero;
        } else if (numero === '.' && this.display.includes('.')) {
            return;
        } else {
            this.display += numero;
        }
        this.atualizarDisplay();
    }

    escolherOperacao(operacao) {
        if (['+', '-', '*', '/'].includes(this.display.slice(-1))) {
            this.display = this.display.slice(0, -1) + operacao;
        } else {
            this.display += operacao;
        }
        this.atualizarDisplay();
    }

    calcular() {
        try {
            this.display = new Function("return " + this.display.replace(/×/g, '*').replace(/÷/g, '/'))();
            if (!isFinite(this.display)) throw new Error("Resultado inválido");
        } catch (error) {
            this.display = "Erro";
        }
        this.atualizarDisplay();
    }

    atualizarDisplay() {
        this.displayElemento.innerText = this.display;
    }
}

const calculadora = new Calculadora(document.querySelector("#display"));

document.querySelector(".botao-container").addEventListener("click", (evento) => {
    const botao = evento.target;
    if (botao.classList.contains("botao")) {
        const valor = botao.dataset.valor;
        const acao = botao.dataset.acao;

        if (acao === "limpar") calculadora.limpar();
        else if (acao === "apagar") calculadora.apagar();
        else if (acao === "calcular") calculadora.calcular();
        else if (valor) calculadora.adicionarNumero(valor);
        else if (["+", "-", "*", "/"].includes(valor)) calculadora.escolherOperacao(valor);
    }
});
