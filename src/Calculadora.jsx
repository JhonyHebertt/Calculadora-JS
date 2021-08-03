import react, { useState } from 'react';
import './Calculadora.css';

import Button from './components/Button';
import Display from './components/Display'


export default function Calculadora() {

    const [displayValue, setDisplayValue] = useState('0');
    const [limparDisplay, SetLimparDisplay] = useState(false);
    const [sinal, setSinal] = useState(null);
    const [numeros, setNumeros] = useState([0, 0]);
    const [posicaoAtual, setPosicaoAtual] = useState(0);
    const [resultado, setResultado] = useState('N');


    function limparMemoria() {
        setDisplayValue('0');
        SetLimparDisplay(false);
        setSinal(null);
        setNumeros([0, 0]);
        setPosicaoAtual(0);
        setResultado('N');
    }

    function limparDigito() {
        if (displayValue === '0' || limparDisplay || resultado === 'S') {
            return
        }

        let digito = displayValue.substr(0, displayValue.length - 1);

        if (digito.length === 0) {
            digito = '0';
        }

        setDisplayValue(digito);

        const i = posicaoAtual //pega qual é o index do array q é para alimentar
        const novoValor = parseFloat(digito) //transforma em float oq está no display
        const valores = [...numeros] //clona o array

        valores[i] = novoValor
        setNumeros(valores)

    }

    function addDigit(n) {
        //trava para não ter mais de um ponto
        if (n === '.' && displayValue.includes('.')) {
            return
        }

        const limparD = displayValue === '0' || limparDisplay //verifica se o numero que está no display já é 0 ou se é para limpar o display já q foi digitado um valor após uma operação
        const valorAtual = limparD ? '' : displayValue //caso n seja para limpar o display, vai pegar os numeros já clicados antes
        const display = valorAtual + n //concatena o valor já existente com o novo clicado

        SetLimparDisplay(false);
        setDisplayValue(display);

        if (n !== '.') {
            const i = posicaoAtual //pega qual é o index do array q é para alimentar
            const novoValor = parseFloat(display) //transforma em float oq está no display
            const valores = [...numeros] //clona o array

            valores[i] = novoValor
            setNumeros(valores)
            setResultado('N');
            console.log(valores)
        }
    }

    function Sinal(s) {
        if (posicaoAtual === 0) {
            setSinal(s); //Atualiza o sinal clicado
            setPosicaoAtual(1); //Atualiza a posição do array
            SetLimparDisplay(true); //libera o display para novo digito
            setResultado('N');
        }
        else {
            const ehIgual = s === '='
            const sinalAtual = sinal
            const valores = [...numeros]

            try {
                //valores[0] = eval(`${valores[0]} ${sinalAtual} ${valores[1]}`)

                //jogo o valor do calculo no index[0]
                switch (sinalAtual) {
                    case '+':
                        valores[0] = Number(valores[0]) + Number(valores[1])
                        break
                    case "-":
                        valores[0] = Number(valores[0]) - Number(valores[1])
                        break;
                    case "*":
                        valores[0] = Number(valores[0]) * Number(valores[1])
                        break;
                    case "/":
                        valores[0] = Number(valores[0]) / Number(valores[1])
                        break;
                    default:
                        valores[0] = valores[0]

                }
            } catch (e) {
                valores[0] = valores[0]
            }
            //zera o valor do index 1 para reutiliza em nova conta
            valores[1] = 0;
            valores[0] = valores[0].toFixed(2);
            console.log(valores)

            setDisplayValue(valores[0]); //atualiza o display
            setSinal(ehIgual ? null : s); //verifica se é igual, caso sim limpa a "state Sinal", se não já atualiza o sinal par anova conta
            setPosicaoAtual(ehIgual ? 0 : 1); //verifica se é igual, caso sim zera o index da array, se não seta a posição do arry para 1 para uma nova conta
            SetLimparDisplay(!ehIgual); //só limpa se Ñ for igual
            setNumeros(valores); //atualiza a array dos valores
            setResultado('S'); //se é resultado, não deixa limpar o campo
        }
    }

    return (
        <div className="calculator">
            <Display value={displayValue} />
            <Button label="AC" funcao={limparMemoria} double />
            <Button label="del" funcao={limparDigito} />
            <Button label="/" funcao={Sinal} sinal />
            <Button label="7" funcao={addDigit} />
            <Button label="8" funcao={addDigit} />
            <Button label="9" funcao={addDigit} />
            <Button label="*" funcao={Sinal} sinal />
            <Button label="4" funcao={addDigit} />
            <Button label="5" funcao={addDigit} />
            <Button label="6" funcao={addDigit} />
            <Button label="-" funcao={Sinal} sinal />
            <Button label="1" funcao={addDigit} />
            <Button label="2" funcao={addDigit} />
            <Button label="3" funcao={addDigit} />
            <Button label="+" funcao={Sinal} sinal />
            <Button label="0" funcao={addDigit} double />
            <Button label="." funcao={addDigit} />
            <Button label="=" funcao={Sinal} sinal />
        </div>
    )
}