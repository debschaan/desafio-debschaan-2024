export const animaisValidos = [
    { especie: "LEAO", tamanho: 3, bioma: ["savana"], carnivoro: true },
    { especie: "LEOPARDO", tamanho: 2, bioma: ["savana"], carnivoro: true },
    { especie: "CROCODILO", tamanho: 3, bioma: ["rio"], carnivoro: true },
    { especie: "MACACO", tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
    { especie: "GAZELA", tamanho: 2, bioma: ["savana"], carnivoro: false },
    { especie: "HIPOPOTAMO", tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
]

export const recintosExistentes = [
    {
        numero: 1, bioma: ["savana"], tamanho: 10,
        animais: [
        { especie: "MACACO", tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
        { especie: "MACACO", tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
        { especie: "MACACO", tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false }
        ],
    },
    {
        numero: 2, bioma: ["floresta"], tamanho: 5, animais: []
    },
    {
        numero: 3, bioma: ["savana", "rio"], tamanho: 7,
        animais: [
            { especie: "GAZELA", tamanho: 2, bioma: ["savana"], carnivoro: false }
        ]
    },
    {
        numero: 4, bioma: ["rio"], tamanho: 8, animais: []
    },
    {
        numero: 5, bioma: ["savana"], tamanho: 9,
        animais: [
            { especie: "LEAO", tamanho: 3, bioma: ["savana"], carnivoro: true }
        ]
    },
]