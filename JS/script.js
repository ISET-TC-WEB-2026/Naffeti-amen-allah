recherche=document.getElementById("recherche-produit")
produits=document.getElementsByClassName("prod-card")
if(recherche!=null){
    recherche.addEventListener("input",function(){
        texte=recherche.value.toLowerCase()
        for(i=0;i<produits.length;i++){
            nom=produits[i].getElementsByClassName("prod-name")[0].textContent.toLowerCase()
            partie=nom.substring(0,texte.length)
            if(partie==texte){
                produits[i].style.display="block"
            }
            else{
                produits[i].style.display="none"
            }
        }
    })
}
panier=[]
nombre=localStorage.getItem("nombre")
if(nombre!=null){
    for(i=0;i<nombre;i++){
        texte=localStorage.getItem("produit"+i)
        produit=texte.split(",")
        produit[1]=produit[1]*1
        produit[2]=produit[2]*1
        panier.push(produit)
    }
}
function sauvegarderPanier(){
    localStorage.setItem("nombre",panier.length)
    for(i=0;i<panier.length;i++){
        texte=panier[i][0]+","+panier[i][1]+","+panier[i][2]
        localStorage.setItem("produit"+i,texte)
    }
}
boutons=document.getElementsByClassName("prod-btn")
for(i=0;i<boutons.length;i++){
    boutons[i].addEventListener("click",creerAjouter(i))
}
function creerAjouter(numero){
    return function(){
        nom=produits[numero].getElementsByClassName("prod-name")[0].textContent
        prix=produits[numero].getElementsByClassName("prod-prix")[0].textContent
        prix=prix.replace(" DT","")*1
        produit=[nom,prix,1]
        panier.push(produit)
        sauvegarderPanier()
        alert("Produit ajouté avec succes")
    }
}
function afficherPanier(){
    contenu=document.getElementById("contenu-panier")
    if(contenu!=null){
        contenu.innerHTML=""
        total=0
        for(i=0;i<panier.length;i++){
            ligne=document.createElement("div")
            nom=document.createElement("p")
            nom.textContent=panier[i][0]
            prix=document.createElement("p")
            prix.textContent=panier[i][1]+" DT"
            quantite=document.createElement("p")
            quantite.textContent="Quantité : "+panier[i][2]
            sousTotal=panier[i][1]*panier[i][2]
            montant=document.createElement("p")
            montant.textContent="Sous-total : "+sousTotal+" DT"
            btnPlus=document.createElement("button")
            btnPlus.textContent="+"
            btnPlus.addEventListener("click",creerPlus(i))
            btnMoins=document.createElement("button")
            btnMoins.textContent="-"
            btnMoins.addEventListener("click",creerMoins(i))
            btnSupprimer=document.createElement("button")
            btnSupprimer.textContent="Supprimer"
            btnSupprimer.addEventListener("click",creerSupprimer(i))
            ligne.appendChild(nom)
            ligne.appendChild(prix)
            ligne.appendChild(quantite)
            ligne.appendChild(montant)
            ligne.appendChild(btnPlus)
            ligne.appendChild(btnMoins)
            ligne.appendChild(btnSupprimer)
            contenu.appendChild(ligne)
            total=total+sousTotal
        }
        document.getElementById("total-panier").textContent="Total : "+total+" DT"
    }
}
function creerPlus(numero){
    return function(){
        panier[numero][2]=panier[numero][2]+1
        sauvegarderPanier()
        afficherPanier()
    }
}
function creerMoins(numero){
    return function(){
        if(panier[numero][2]>1){
            panier[numero][2]=panier[numero][2]-1
            sauvegarderPanier()
            afficherPanier()
        }
    }
}
function creerSupprimer(numero){
    return function(){
        panier=panier.filter(function(produit,index){
            return index!=numero
        })
        sauvegarderPanier()
        afficherPanier()
    }
}
afficherPanier()