
let areas = {
    a: null,
    b: null,
    c: null,
};

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragstart);
    item.addEventListener('dragend', dragend);
});

document.querySelectorAll('.area').forEach(item => {

    item.addEventListener('dragover', dragover);
    item.addEventListener('dragleave', dragleave);
    item.addEventListener('drop', drop);
});

document.querySelector('.neutralArea').addEventListener('dragover', dragoverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragleaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

function dragstart(e){

    //adicionando opacidade ao item arrastado
    e.currentTarget.classList.add('dragging');
}

function dragend(e){

    //removendo opacidade do item arrastado
    e.currentTarget.classList.remove('dragging');
}

function dragover(e){

    //se não houver nenhum item dentro da caixas, permite o efeito de drop
    if(e.currentTarget.querySelector('.item') === null) {

        e.preventDefault(); //remove o comportamento normal do objeto - que no caso é negar o drop
        e.currentTarget.classList.add('hover'); //adicionando opacidade a caixa que receberá o item
    }
}

function dragleave(e){

    e.currentTarget.classList.remove('hover'); //removendo opacidade a caixa que receberá o item
}

function drop(e){

    e.currentTarget.classList.remove('hover'); //removendo opacidade a caixa que receberá o item

    //se não houver nenhum item dentro da caixas, permite o drop
    if(e.currentTarget.querySelector('.item') === null){

        //recuperando o item que está sendo dropado
        let draggingItem = document.querySelector('.item.dragging');

        //move o item de lugar
        e.currentTarget.appendChild(draggingItem);
        updateAreas();
    }
}

function dragoverNeutral(e){

    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragleaveNeutral(e){

    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e){

    e.currentTarget.classList.remove('hover');

    //recuperando o item que está sendo dropado
    let draggingItem = document.querySelector('.item.dragging');

    //move o item de lugar
    e.currentTarget.appendChild(draggingItem);
    updateAreas();
}

function updateAreas(){

    document.querySelectorAll('.area').forEach(area => {

        let name = area.getAttribute('data-name');

        //se tem um item dentro da area
        if(area.querySelector('.item') !== null){

            areas[name] = area.querySelector('.item').innerHTML;
        }
        else{
            areas[name] = null;
        }
    });

    if(areas.a === '1' && areas.b === '2' && areas.c === '3'){
        document.querySelector('.areas').classList.add('correct');
    }
    else if(areas.a === '3' && areas.b === '2' && areas.c === '1'){
        document.querySelector('.areas').classList.add('inverse');
    }
    else{
        document.querySelector('.areas').classList.remove('correct');
        document.querySelector('.areas').classList.remove('inverse');
    }

}

