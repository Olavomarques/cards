let produtosData = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch('produtos.json')
        .then(response => response.json())
        .then(data => {
            produtosData = data;
            exibirProdutos(produtosData);
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
});

function exibirProdutos(produtos) {
    const container = document.getElementById('produtos');
    container.innerHTML = '';
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(6)}</p>
        `;
        container.appendChild(card);
    });
}

function ordenarProdutos(criterio) {
    const produtosOrdenados = [...produtosData].sort((a, b) => {
        return criterio === 'asc' ? a.preco - b.preco : b.preco - a.preco;
    });
    exibirProdutos(produtosOrdenados);
}

function filtrarProdutos(precoMax) {
    const produtosFiltrados = produtosData.filter(produto => produto.preco <= precoMax);
    exibirProdutos(produtosFiltrados);
}

function resetarProdutos() {
    exibirProdutos(produtosData);
}
