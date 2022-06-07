console.log("minha script está funcionando");


checkform = {
    productName: false,
    productPrice: false,
    productDescription: false,
    productURL: false
}

console.log(checkform)


document.getElementById('nameProduct').addEventListener('input', function (e) {
    const productName = e.target.value
    if(productName.length>50){
        document.getElementById('productName-error').style.display = "block"
        checkform.productName = false;
    }else{
        document.getElementById('productName-error').style.display = "none"
        checkform.productName = true;
    }
    enableButton();
});

document.getElementById('productPrice').addEventListener('input', function (e) {
    const productPrice = e.target.value
    if(isNaN(productPrice)){
        document.getElementById('productPrice-error').style.display = "block"
        checkform.productPrice = false;
    }else{
        document.getElementById('productPrice-error').style.display = "none"
        checkform.productPrice = true;
    }
    enableButton();
});

document.getElementById('productDescription').addEventListener('input', function (e) {
    const productDescription = e.target.value
    if(productDescription.length>200 || productDescription.length<5){
        document.getElementById('productDescription-error').style.display = "block"
        checkform.productDescription = false;
    }else{
        document.getElementById('productDescription-error').style.display = "none"
        checkform.productDescription = true;
    }
    enableButton();
});

document.getElementById('productURL').addEventListener('input', function (e) {
    const productURL = e.target.value
    if(validURL(productURL)) {
        document.getElementById('productURL-error').style.display = "block"
        checkform.productURL = false;
    }else{
        document.getElementById('productURL-error').style.display = "none"
        checkform.productURL = true;
    }
    enableButton();
});

function validURL(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !pattern.test(str);
  }

function enableButton(){
    const button = document.getElementById('ButtonCadastrar');
    if(checkform.productName && checkform.productDescription && checkform.productPrice && checkform.productURL){
        button.disabled = false;
    }else{
        button.disabled = true;
    }
}

const showProducts = (products) =>{
     console.log('Cheguei no show products');
    console.log(products);

    // console.log(products.lenght);

    for (let i = 0; i < products.length; i++) {
        console.log(products[i].name);

        let tagDivCard = document.createElement('div');
        tagDivCard.setAttribute('class','card mx auto mb-2');
        tagDivCard.setAttribute('style','width:300px');

        let tagImage = document.createElement('img');
        tagImage.setAttribute('class','card-img-top');
        tagImage.setAttribute('src',products[i].urlProductImage);
        tagImage.setAttribute('alt',products[i].name);  
        tagDivCard.appendChild(tagImage);

        let tagDivCardBody = document.createElement('div');
        tagDivCardBody.setAttribute('class','card-body');
        tagDivCard.appendChild(tagDivCardBody);

        let tagH5 = document.createElement('h5');
        tagH5.setAttribute('class','card-title text-center');
        let textNode = document.createTextNode(products[i].name);
        tagH5.appendChild(textNode);
        tagDivCardBody.appendChild(tagH5);

        let tagH6 = document.createElement('h6');
        tagH6.setAttribute('class','text-center');
        textNode = document.createTextNode(products[i].category);
        tagH6.appendChild(textNode);
        tagDivCardBody.appendChild(tagH6);

        let tagP = document.createElement('p');
        tagP.setAttribute('class','card-text text-center');
        textNode = document.createTextNode(products[i].description);
        tagP.appendChild(textNode);
        tagDivCardBody.appendChild(tagP);

        tagP = document.createElement('p');
        tagP.setAttribute('class','text-center price');
        textNode = document.createTextNode(products[i].price);
        tagP.appendChild(textNode);
        tagDivCardBody.appendChild(tagP);

        let tagA = document.createElement('a');
        tagA.setAttribute('href','#');
        tagA.setAttribute('class','btn btn-primary mx-auto');
        tagA.setAttribute('style', 'width: 100%');
        textNode = document.createTextNode('Adicionar ao carrinho.');
        tagA.appendChild(textNode);
        tagDivCardBody.appendChild(tagA);

        let tagDivFemProducts = document.getElementById('femproducts');
        tagDivFemProducts.appendChild(tagDivCard);

    }
}

const fetchProducts = (products) => {
    console.log('Cheguei na script para carregar os produtos');

    fetch('http://localhost:8000/GetProducts.php')
        .then((response) => {
            if (response.status >= 200 && response.status<300){
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then((products) => {
            console.log(products);
            showProducts(products);
        })
        .catch((error) => {
            console.log(error);
        })
}
