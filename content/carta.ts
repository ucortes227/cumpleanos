// Contenido editable de la carta de cumpleaños
// Modifica este archivo para personalizar el mensaje sin tocar el código principal.
//
// - titulo:    encabezado grande de la carta
// - saludo:    primer párrafo (en cursiva)
// - parrafos:  cada elemento del arreglo es un párrafo
// - destacado: índices de "parrafos" que se muestran resaltados (frases cortas)
// - cierre:    texto final antes de la firma ("\n" = salto de línea)
// - firma:     puedes usar "\n" para partirla en varias líneas
// - ornamento: "estrella" o "corazon" (detalle minimalista bajo la firma)

export type Ornamento = "estrella" | "corazon";

export const cartaContent: {
  titulo: string;
  saludo: string;
  parrafos: string[];
  destacado: number[];
  cierre: string;
  firma: string;
  ornamento: Ornamento;
} = {
  titulo: "Feliz cumpleaños Yesuri ❤️",

  saludo:
    "Hoy es un día especial, porque hace años llegó al mundo una persona que, sin imaginarlo, terminaría convirtiéndose en alguien muy importante en mi vida.",

  parrafos: [
    "No sé cómo estés viviendo este día, qué sueños estés persiguiendo o cuántas cosas bonitas estén sucediendo en tu vida, pero sinceramente deseo que la vida te esté tratando bonito. Que nunca te falten motivos para sonreír, personas que te quieran de verdad y razones para seguir creciendo y convirtiéndote en esa mujer que siempre has querido ser.",

    "Quiero que sepas que, a pesar de todo lo que ha sucedido, nunca voy a desearte algo distinto a la felicidad. Hay personas que llegan a nuestra vida y dejan recuerdos; otras dejan enseñanzas, y existen algunas que, sencillamente, se quedan en una parte de nosotros que el tiempo no consigue borrar.",

    "Para mí, tú eres una de esas personas.",

    "A veces pienso en aquella historia del hilo rojo, esa leyenda que dice que dos personas destinadas a encontrarse permanecen conectadas por un hilo invisible, sin importar la distancia, el tiempo o las circunstancias. Quizá la vida tenga sus propias maneras de acomodar las cosas, quizá nuestros caminos debían separarse para enseñarnos algo que juntos no habríamos aprendido.",

    "Pero hay algo que quiero decirte: el hilo rojo siempre tendrá un significado especial para mí. No porque espere que estés atada a mi historia, ni porque quiera detenerte, sino porque representa algo que agradezco haber vivido contigo.",

    "No sé qué nos depare el futuro. Tampoco quiero escribir estas palabras para pedirte algo, cambiar tus decisiones o hacerte sentir comprometida con un recuerdo. Simplemente quería que, en tu cumpleaños, supieras que hubo alguien que te quiso profundamente, que sigue deseándote cosas bonitas y que estará agradecido por haber coincidido contigo en esta vida.",

    "Si algún día nuestros caminos vuelven a encontrarse, me gustaría que fuera desde una versión más madura, más consciente y más bonita de nosotros mismos. Sin reproches, sin heridas pendientes y sin intentar recuperar exactamente lo que fuimos, sino con la posibilidad de conocer lo que podríamos llegar a ser.",

    "Y si la vida decide escribir historias diferentes para cada uno, también deseo que la tuya esté llena de amor, tranquilidad y momentos inolvidables.",
  ],

  // "Para mí, tú eres una de esas personas." se muestra resaltada
  destacado: [2],

  cierre:
    "Feliz cumpleaños.\nQue nunca pierdas esa esencia que te hace ser tú. Que cumplas cada sueño que alguna vez me contaste y que, incluso en los días difíciles, nunca olvides lo valiosa que eres me hubiera gustado darte tu termo y tu cofia en persona te prometi darte una cada que avances de nivel siempre estare orgulloso de ti.",

  firma:
    "Con mucho cariño,\nAlguien que siempre estará agradecido por haberte encontrado. ❤️",

  ornamento: "estrella",
};
