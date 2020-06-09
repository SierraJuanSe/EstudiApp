var salon=$('#Salon').val();
let baseDeDatos = [
    {
        id: 1,
        nombre: 'Mani',
        descripcion: 'Mani el Manicero con Sal 25gr',
        precio: 1000,
        imagen: 'static/img/Productos/mani.jpg'
    },
    {
        id: 2,
        nombre: 'Chocolatina Jet',
        descripcion: 'Tableta de chocolate y leche 12gr',
        precio: 800,
        imagen: 'static/img/Productos/chocolatinajet.jpg'
    },
    {
        id: 3,
        nombre: 'Papas Margarita',
        descripcion: 'Papas Fritas sabor natural 115gr',
        precio: 2000,
        imagen: 'static/img/Productos/margaritaNatural.jpg'
    },
    {
        id: 4,
        nombre: 'Jugo Nectar',
        descripcion: 'Bebida refrescante sabor a durazno 300ml',
        precio: 1800,
        imagen: 'static/img/Productos/nectar.jpg'
    },
    {
        id: 5,
        nombre: 'Papas Pringles',
        descripcion: 'Patata deshidratada de trigo y harinas sabor queso 124gr',
        precio: 7800,
        imagen: 'static/img/Productos/pringles.jpg'
    },
    {
        id: 6,
        nombre: 'Galletas Festival',
        descripcion: '6 galletas de chocolate rellenas con crema sabor vainilla 50gr',
        precio: 700,
        imagen: 'static/img/Productos/festival.jpg'
    },
    {
        id: 7,
        nombre: 'Ponque Chocorramo',
        descripcion: 'Ponque con recubrimiento en chocolate 65gr',
        precio: 1500,
        imagen: 'static/img/Productos/chocorramo.jpg'
    },
    {
        id: 8,
        nombre: 'Pepsi',
        descripcion: 'Bebida refrescante y efervescente con agua, ácido carbónico y azúcar 400ml',
        precio: 1650,
        imagen: 'static/img/Productos/pepsi.jpg'
    },
    {
        id: 9,
        nombre: 'Doritos',
        descripcion: 'tortilla de maíz frita sabor queso cheddar 185gr',
        precio: 2200,
        imagen: 'static/img/Productos/doritos.jpg'
    },
    {
        id: 10,
        nombre: 'Chiclets Adams',
        descripcion: 'Goma de mascar sabor a menta 16,8gr',
        precio: 1400,
        imagen: 'static/img/Productos/chiclets.jpg'
    },
    {
        id: 11,
        nombre: 'Minichips',
        descripcion: 'Galletas con trocitos sabor a chocolate 35gr',
        precio: 900,
        imagen: 'static/img/Productos/minichips.jpg'
    },
    {
        id: 12,
        nombre: 'Agua Manantial',
        descripcion: 'Agua pura filtrada naturalmente 600ml',
        precio: 2300,
        imagen: 'static/img/Productos/agua.jpg'
    }
]
    
    let $items = document.querySelector('#items');
    let pedido = [];
    let total = 0;
    let final = 0;
    let $final =document.querySelector('#final');
    let $finalmodal =document.querySelector('#finalmodal');
    let $pedido = document.querySelector('#carrito');
    let $modalpedido = document.querySelector('#modalpedido');
    let $total = document.querySelector('#total');

    function renderItems () {
        for (let info of baseDeDatos) {
            // Estructura
            let miNodo = document.createElement('div');
            miNodo.classList.add('card','col-sm-4','border','border-success');
            // Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];
            // Imagen
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info['imagen']);
            // descripcion
            let miNodoDescripcion = document.createElement('p');
            miNodoDescripcion.classList.add('card-text');
            miNodoDescripcion.textContent =info['descripcion'];
            // Precio
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = '$'+info['precio']+' c/u';
            // Boton 
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-outline-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', añadirCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoDescripcion);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }

    function añadirCarrito () {
        pedido.push(this.getAttribute('marcador'))
        calcularTotal();
        calcularTotalFinal();
        renderizarCarrito();
        renderizarModal();
    }

    function renderizarCarrito () {
        $pedido.textContent = '';
        let carritoSinDuplicados = [...new Set(pedido)];
        carritoSinDuplicados.forEach(function (item, indice) {
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            let numeroUnidadesItem = pedido.reduce(function(total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'list-group-item-info', 'border', 'border-primary','text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}$`;
            // Boton de borrar
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-outline-danger', 'mx-2');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            $pedido.appendChild(miNodo);
        })
    }

    function renderizarModal () {
        $modalpedido.textContent = '';
        let carritoSinDuplicados = [...new Set(pedido)];
        carritoSinDuplicados.forEach(function (item, indice) {
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            let numeroUnidadesItem = pedido.reduce(function(total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'list-group-item-info', 'border', 'border-primary','text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}$`;
            // Mezclamos nodos
            $modalpedido.appendChild(miNodo);
        })
    }

    function borrarItemCarrito () {
        console.log()
        // Obtenemos el producto ID que hay en el boton pulsado
        let id = this.getAttribute('item');
        // Borramos todos los productos
        pedido = pedido.filter(function (carritoId) {
            return carritoId !== id;
        });
        renderizarCarrito();
        calcularTotal();
        calcularTotalFinal();

    } 
    
    function calcularTotal () {
        total = 0;
        for (let item of pedido) {
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }
        $total.textContent = total.toFixed(0);
    }
    function calcularTotalFinal () {
        final=0;
        final=total+1500;
        $final.textContent = final.toFixed(0);
        $finalmodal.textContent = final.toFixed(0);
    }
    renderItems();


$( '#Btn_ModalPedido' ).click(function(){
   $("#salonmodal").empty();
   $("#salonmodal").append('<p class="text-right"><b>Salon : '+$('#Salon').val()+' </b></p>');
});