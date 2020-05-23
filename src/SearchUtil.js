import { Characters, Species, TypeCharacter, Episodes } from './rmJSON';

const SearchUtil = function () { 
    let input = document.getElementById('searchbar').value 
    input=input.toLowerCase(); 
    let x = Characters.forEach(el => {
        return el.name;
    });
    for (let i = 0; i < x.length; i++) {  
        if (!x[i].toLowerCase().includes(input)) { 
            x[i].style.display="none"; 
        } 
        else { 
            x[i].style.display="list-item";                  
        } 
    }
} 

exports.SearchUtil = SearchUtil;