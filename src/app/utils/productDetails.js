const products = {
  "power-serum": {
    id: "VS_SERUM_001",
    title: "NIGHT POWER SERUM",
    price: 28_000,
    transferPrice: 23_500,
    creditPrice: 25_200,
    descriptionTitle:
      "NIGHT POWER SERUM CON 20% DE NIACINAMIDA, 2,5% DE ÁCIDO HIALURÓNICO.",
    description:
      "Esta poderosa combinación revitaliza tu piel mientras dormís. La niacinamida al 20% minimiza los poros, equilibra la producción de sebo y mejora la textura de la piel. El ácido hialurónico al 2.5% mantiene la piel hidratada toda la noche. Despierta con una piel increíblemente hidratada y suave, con poros minimizados y un brillo natural. Este sérum fortalece la barrera cutánea y repara los daños existentes. ¡Descubrí la magia de este sérum nocturno y despertá con una piel más joven, fresca y radiante!",
    images: ["/Serum.jpeg", "/Serum.jpeg", "/Serum.jpeg"],
    haveTestimonies: true,
    testimoniesImages: [
      "/Testimonio1.png",
      "/Testimonio2.png",
      "/Testimonio3.png",
      "/Testimonio4.png",
    ],
    referedProduct: [
      {
        title: "POWER CREAM",
        image: "/PowerCream.jpg",
        description:
          "Crema facial con 20% de niacinamida, ácido salicílico 2% y vitamina C",
      },
    ],
    productDetails: [
      {
        title: "Beneficios",
        information:
          "La niacinamida al 20% minimiza la apariencia de los poros, regula la producción de sebo y mejora la textura de la piel, dejándola más uniforme. El ácido hialurónico al 2.5% retiene la humedad, proporcionando una hidratación profunda y duradera. Juntos, ofrecen una piel más suave, elástica y radiante. La niacinamida también tiene propiedades antiinflamatorias que calman y reparan la piel, reduciendo enrojecimientos. Además, el sérum fortalece la barrera cutánea y ayuda a reducir líneas finas y arrugas.",
        icon: "BenefitsIcon",
      },
      {
        title: "Modo de Uso",
        information:
          "Cuando: Último paso de la rutina\nCuánto: 2 a 3 gotas.\nCómo: Sobre la piel limpia y seca, aplicar y dejar que se absorba en la piel.",
        icon: "UsageIcon",
      },
      {
        title: "Ingredientes Activos",
        information:
          "SERUM NIACINAMIDA 20%\nINCI: Arginato celulósico, Hidroxietilmetilcelulosa, Glicerina, Ac. Hialurónico, Niacinamida liposomada, Extracto de aloe vera natural, metil parabenos, metil parabenos.",
        icon: "IngredientsIcon",
      },
      {
        title: "Info de Compras y Envíos",
        information:
          "2 cuotas sin interés con todas las tarjetas de crédito\n15% de descuento por transferencia/efectivo\n🚚 Para envíos en el interior del país, el correo que los distribuye es Andreani- Tiempo de entrega: hasta 6 días hábiles.",
        icon: "ShoppingIcon",
      },
    ],
  },
  "power-cream": {
    id: "VS_CREAM_002",
    title: "POWER CREAM",
    price: "24.200",
    lowestPrice: "21.000",
    descriptionTitle:
      "CREMA FACIAL CON 20% DE NIACINAMIDA, ÁCIDO SALICÍLICO 2% Y VITAMINA C",
    description:
      "Utilizar esta crema todos los días transforma tu piel. La niacinamida al 20% reduce los poros, equilibra la producción de sebo y mejora la textura. El ácido salicílico al 2% exfolia y limpia profundamente, previniendo brotes y reduciendo imperfecciones. La vitamina C ilumina la piel, iguala el tono, protege contra daños ambientales y promueve la producción de colágeno para reducir líneas finas y arrugas.",
    images: ["/Serum.jpeg", "/Serum.jpeg", "/Serum.jpeg"],
    haveTestimonies: false,
    testimoniesImages: [
      "/Testimonio1.png",
      "/Testimonio2.png",
      "/Testimonio3.png",
      "/Testimonio4.png",
    ],
    referedProduct: [
      {
        title: "NIGHT POWER SERUM",
        image: "/Serum.jpeg",
        description: "Serum con 20% de niacinamida, 2,5% de ácido hialurónico.",
      },
    ],
    productDetails: [
      {
        title: "Beneficios",
        information:
          "Es un gran aliado para tu piel. El ácido salicílico y la niacinamida son altamente buscados por sus propiedades antiacné y seborreguladoras. El ácido salicílico penetra en los poros y exfolia profundamente, mientras que la niacinamida, una forma de vitamina B3, restaura la energía celular y aumenta la producción de colágeno. Juntos, son especialmente útiles para piel grasa, poros abiertos o acné adulto.",
        icon: "BenefitsIcon",
      },
      {
        title: "Modo de Uso",
        information:
          "Cuando. De día y de noche. Cómo. Sobre la piel limpia aplicar y dejar que se absorba en la piel.",
        icon: "UsageIcon",
      },
      {
        title: "Ingredientes Activos",
        information:
          "CREMA FACIAL CON NIACINAMIDA, VIT C Y AC. SALICILICO 2 % INCI: Cera Emulsionante, Cera Lanette xs, Alcohol Cetilico, Ácido Estearico, Parafina Líquida, Glicerina, Propilenglicol, Vitamina C Liposomada, Niacinamida al 20%, Acido Salicílico al 2%, Complejo Liposomado Emoliente, Propilparabeno y Metiloarabano.",
        icon: "IngredientsIcon",
      },
      {
        title: "Info de Compras y Envíos",
        information:
          "2 cuotas sin interés con todas las tarjetas de crédito\n15% de descuento por transferencia/efectivo\n🚚 Para envíos en el interior del país, el correo que los distribuye es Andreani- Tiempo de entrega: hasta 6 días hábiles.",
        icon: "ShoppingIcon",
      },
    ],
  },
};

export default products;
