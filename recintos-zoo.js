import { animaisValidos, recintosExistentes } from "./dados.js";

class RecintosZoo {
    //"impôr" a lista de animais válidos e os recintos como características da classe
    constructor() {
        //trazer dados importados de dados.js
        this.animais = animaisValidos;
        this.recintos = recintosExistentes;
    }

    analisaRecintos(especie, quantidade) {

        //1.Vericar erros
        if (!this.verificaQuantidadeNula(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        if (!this.verificaEspecie(especie)) {
            return { erro: "Animal inválido" };
        }

        //Variável que guarda os recintos viáveis filtrados
        let recintosViaveis = this.filtraRecintos(especie, quantidade);

        //Caso não houver recintos viáveis, exibir mensagem de erro
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        //Se houver recintos viáveis, retorna a lista ordenada deles
        return { recintosViaveis: this.ordenaRecintosViaveis(recintosViaveis) };

    }

    //Funções para erros
    verificaQuantidadeNula(quantidade) {
        return quantidade > 0;
    }

    verificaEspecie(especie) {
        return this.animais.some(a => a.especie.toLowerCase() === especie.toLowerCase());
    }

    //Funções auxiliares
    verificaEspacoDisponivel(recinto, especie, quantidade) {
        //Guardar especie identificada em variável para futuro uso
        const animalIdentificado = this.animais.find(a => a.especie.toLowerCase() === especie.toLowerCase());
        //cálculo do espaço ocupado: se não houver animais, está vazio
        let espacoOcupado = recinto.animais.length > 0 ? recinto.animais.reduce((acc, animal) => acc + animal.tamanho, 0) : 0;
        //cálculo do espaço a ser ocupado pelos novos animais
        let espacoASerOcupado = animalIdentificado.tamanho * quantidade;
        //cálculo do espaço livre restante
        let espacoLivre = recinto.tamanho - espacoOcupado;
        //espaço livre for maior igual ao espaço a ser ocupado
        return espacoLivre >= espacoASerOcupado;
    }

    verificaBioma(recinto, especie) {
        //Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo;
        const animalIdentificado = this.animais.find(a => a.especie.toLowerCase() === especie.toLowerCase());
        // Verifica se há interseção entre os biomas do animal e do recinto
        return animalIdentificado.bioma.some(biomaAnimal => recinto.bioma.includes(biomaAnimal));
    }

    verificaCarnivoros(recinto, especie) {
        const animalIdentificado = this.animais.find(a => a.especie.toLowerCase() === especie.toLowerCase());
        // Se o recinto estiver vazio, o carnivoro não é relevante nesse ponto
        if (recinto.animais.length === 0) return true;

        //Se forem 2 carnívoros, verificar se é mesma espécie
        if (recinto.animais[0].carnivoro === animalIdentificado.carnivoro && animalIdentificado.carnivoro === true) {
            return recinto.animais[0].especie === animalIdentificado.especie;
        }
        // Se for um carnívoro e um herbívoro, anular
        if (recinto.animais[0].carnivoro !== animalIdentificado.carnivoro) {
            return false
        }
        // Se forem dois herbívoros, de espécies diferentes
        if (recinto.animais[0].carnivoro === animalIdentificado.carnivoro && animalIdentificado.carnivoro === false) {
            return true;
        }
        // Se não houver animais no recinto, não há problema com carnívoros
        return true
    }

    consideraMacacos(recinto, especie, quantidade) {
        return especie.toUpperCase() === "MACACO" && (quantidade + recinto.animais.length) > 1;
    }

    verificaEspacoCoabitacao(recinto, especie, quantidade) {
        const animalIdentificado = this.animais.find(a => a.especie.toLowerCase() === especie.toLowerCase());
        let espacoOcupado = recinto.animais.length > 0 ? recinto.animais.length * recinto.animais[0].tamanho : 0;
        let espacoASerOcupado = animalIdentificado.tamanho * quantidade;
        // Verificação se a espécie já existente no recinto é diferente
        const especiesDiferentes = recinto.animais.length > 0 && recinto.animais[0].especie.toLowerCase() !== especie.toLowerCase();
        // Se houver espécies diferentes, adiciona 1 unidade de espaço extra, determinando o espaço necessário para coabitação
        let espacoLivreNecessario = espacoASerOcupado + (especiesDiferentes ? 1 : 0);
        // Espaço livre no recinto
        let espacoLivre = recinto.tamanho - espacoOcupado;
        // Retorna se há espaço suficiente para coabitar
        return espacoLivre >= espacoLivreNecessario;
    }

    consideraHipopotamos(recinto, especie) {
        //identifica especie
        const animalIdentificado = this.animais.find(a => a.especie.toLowerCase() === especie.toLowerCase());
        //se é Hipo, define como sendo o Recinto 3 apenas
        return animalIdentificado == "HIPOPOTAMO" && recinto.bioma == this.recintos[2].bioma;
    }

    filtraRecintos(especie, quantidade) {
        return this.recintos.filter(recinto => {
            const biomaOk = this.verificaBioma(recinto, especie);
            const carnivoroOk = this.verificaCarnivoros(recinto, especie);
            const espacoOk = this.verificaEspacoCoabitacao(recinto, especie, quantidade);
            return biomaOk && carnivoroOk && espacoOk;
        });
    }

    //Ordenar os recintos pelo número
    ordenaRecintosViaveis(recintos) {

        return recintos.sort((a, b) => a.numero - b.numero).map(recinto => {
            return `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanho} total: ${recinto.tamanho})`;



        })

    }
}

let resultado = new RecintosZoo().analisaRecintos("MACACO", 1);

export { RecintosZoo as RecintosZoo };