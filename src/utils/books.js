import { Theorie_economique_africaine, les_fondements_economiques } from './booksDescription'

const theorie_economique_africaine = {
    id: 1,
    ref: 'theorie_economique_africaine',
    title: 'La théorie Économique africaine',
    author: 'Mbog Bassong ',
    description: Theorie_economique_africaine,
    isAudio: true,
    illustration: 'https://firebasestorage.googleapis.com/v0/b/essims-videos.appspot.com/o/images%2Fpanafricanisme%2Ftheorie_mbong.png?alt=media&token=1cc7d18d-0b03-436e-8007-c7fcb190d2cf'
}

const fondements_economiques_et_culturels = {
    id: 2,
    ref: 'fondements_economiques_et_culturels',
    title: "Les fondements économiques & culturels d'un état fédéral d'Afrique",
    author: 'Cheikh Anta Diop',
    description: les_fondements_economiques,
    isAudio: true,
    illustration: 'https://firebasestorage.googleapis.com/v0/b/essims-videos.appspot.com/o/images%2Fpanafricanisme%2Fles_fondements_eco.png?alt=media&token=2e4ec570-14b3-408c-90b7-44a087bc6456'
}


export const books = [
    theorie_economique_africaine,
    fondements_economiques_et_culturels,
]