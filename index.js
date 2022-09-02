const entradas = [
  {
    id: 1,
    nombre: "Afrojack",
    precio: 200,
    stock: 250,
    img:'https://ibb.co/rZGJkHp',
  },
  {
    id: 2,
    nombre: "Claptone",
    precio: 400,
    stock: 200,
    img: "https://ibb.co/CmCvSbC",
  },
  {
    id: 3,
    nombre: "Swedish house mafia",
    precio: 600,
    stock: 300,
    img: "https://ibb.co/Sx1qtM4",
  },
]
function imprimirDetalle(id, insertBox){
    let entrada = entradas[id-1]
    const {nombre, precio, stock, img} = entrada

    insertBox.innerHTML = `<div>
                                <div class="closePopup">Salir</div>
                                <section class="product-detail">
                                    <div class="imagen">
                                        <img src="${img}" alt="">
                                    </div>
                                    <div class="descripcion-detail">
                                        <h3>${nombre}</h3>
                                        <p><strong>$ ${precio}</strong> - 6 cuotas sin interes</p>
                                        <div class="click">
                                            <span class="less">-</span>
                                            <span class="resultado">0</span>
                                            <span class="more">+</span>
                                        </div>
                                    <div class="botonCarrito">AGREGAR</div>

                                    </div>
                                </section>
                            </div>`

    const closePopup = document.querySelector('.closePopup')
    const more = document.querySelector('.more')
    const less = document.querySelector('.less')
    const resultado = document.querySelector('.resultado')
    const agragarCarrito = document.querySelector('.botonCarrito')
    let contador = 0

    more.onclick = () => {
        contador++
        contador = contador > stock ? stock : contador
        resultado.innerText = contador
    }

    less.onclick = () => {
        contador--
        //console.log(contador)
        contador = contador < 0 ? 0 : contador
        resultado.innerText = contador
    }

    closePopup.onclick = () => {
        popup.classList.add('d-none')
    }
        
    agragarCarrito.onclick = () => {
        if(contador != 0){
            //agrego al carrito
            producto.agregadoAlCarrito = contador
            storage.push(producto)
            sessionStorage.setItem('carrito', JSON.stringify(storage))

            swal({
                title: `Agregaste ${producto.agregadoAlCarrito} ${nombre} a tu carrito!`,
                icon: 'success',
                confirmButtonText: 'Cool'
            })
           
        }else{
            //no agregues al carrito - mensaje error
            swal({
                title: 'Error!',
                text: 'No podemos agregar 0 productos al carrito',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }
}

const mainBox = document.querySelector('.main')

//For para insertar productos al main segun mi array de objetos
for(entrada of entradas){
    //Uso desestructuracion para no repetir producto.propiedad
    const {id, nombre, precio, stock, img} = entrada

    //console.log(id)
    mainBox.innerHTML +=  `<article class="entradas">
                                <div class="imagen">
                                    <img src="${img}" alt="${nombre}">
                                </div>
                                <div class="descripcion">
                                    <h3>${nombre}</h3>
                                    <div class="boton boton-${id}">Ver detalle</div>
                                    <input type='hidden' class='info-id' value="${id}"/>
                                </div>
                            </article>`

    let botonProd = document.querySelector(`.boton-${id}`)
}

const botonesVerDetalle = document.querySelectorAll('.boton')
const popup = document.querySelector('.popupDetalle')


//Como tengo un array donde todos los btoones tienen la misma clase, uso el querySelectorAll y recorro ese array dandoles un evento de onclick
for(verDetalle of botonesVerDetalle){
    verDetalle.onclick = (e) => {
        //popup.style.display = 'flex'
        popup.classList.remove('d-none')
        let id = e.target.nextElementSibling.value
        imprimirDetalle(id, popup)
    }

}

//https://ibb.co/4NdbfK7
//https://ibb.co/pjZh97c
//https://ibb.co/8N43wWD
