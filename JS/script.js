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
tableau=[["Table en bois",450,"images/table.jpg","Cette table en bois se distingue par son design élégant et sa forme pratique. Elle offre une surface spacieuse permettant de prendre les repas, de travailler ou de partager des moments conviviaux en famille. Son apparence naturelle apporte une ambiance chaleureuse à votre intérieur."],
["Chaise moderne",120,"images/chaise.jpg","Cette chaise moderne associe simplicité et élégance pour compléter harmonieusement votre espace intérieur. Sa conception est pensée pour offrir une position d'assise agréable pendant les repas ou les activités quotidiennes. Son design contemporain lui permet de s'adapter à différents types de tables et de décorations."],
["Fauteuil confortable",380,"images/fauteuil.jpg","Ce fauteuil confortable est conçu pour créer un espace de détente agréable dans votre maison. Sa forme accueillante et son style élégant en font un élément idéal pour aménager un coin de repos dans votre salon. Il permet de profiter de moments de lecture ou de se relaxer après une longue journée."],
["Bureau de travail",520,"images/bureau.jpg","Ce bureau de travail offre un espace organisé et fonctionnel pour réaliser vos activités quotidiennes. Sa surface permet d'installer un ordinateur, des documents et les accessoires nécessaires au travail ou aux études. Son design pratique facilite l'organisation de votre espace."],
["Étagère classique",290,"images/etagere.jpg","Cette étagère classique constitue une solution pratique pour organiser et présenter différents objets dans votre intérieur. Ses espaces de rangement permettent de disposer des livres, des accessoires et des éléments décoratifs tout en gardant votre pièce bien organisée."],
["Table basse",250,"images/tablebasse.jpg","Cette table basse est un élément essentiel pour compléter l'aménagement de votre salon. Elle offre une surface pratique pour poser des boissons, des magazines, des télécommandes ou des objets décoratifs. Elle facilite l'utilisation de votre espace de réception."],
["Chaise rembourrée",160,"images/chaise_rembourree.jpg","Cette chaise rembourrée est pensée pour améliorer le confort de votre espace de repas. Son assise douce et son dossier rembourré offrent une sensation agréable pendant les moments passés à table. Son apparence soignée apporte une touche élégante à votre salle à manger."],
["Étagère moderne",350,"images/etagere_moderne.jpg","Cette étagère moderne combine fonctionnalité et décoration pour valoriser votre espace intérieur. Elle permet de ranger et d'exposer différents objets tels que des livres, des cadres photo, des plantes et des accessoires décoratifs."]]
for(i=0;i<produits.length;i++){
    liens=produits[i].getElementsByTagName("a")
    for(j=0;j<liens.length;j++){
        liens[j].addEventListener("click",choixprod(i))
    }
}
function choixprod(numero){
    return function(){
        localStorage.setItem("numero",numero)
    }
}
numero=Number(localStorage.getItem("numero"))
photo=document.getElementById("photo-produit")
if(photo!=null && localStorage.getItem("numero")!=null && numero<tableau.length){
    photo.src=tableau[numero][2]
    document.getElementById("nom-produit").textContent=tableau[numero][0]
    document.getElementById("prix-produit").textContent=tableau[numero][1]+" DT"
    document.getElementById("description-produit").textContent=tableau[numero][3]
}
bouton=document.getElementById("ajouter-panier")
if(bouton!=null && photo!=null && numero>=0 && numero<tableau.length){
    bouton.addEventListener("click",creerAjouterProduit())
}
function creerAjouterProduit(){
    return function(){
        quantite=Number(document.getElementById("quantite").value)
        if(quantite>=1){
            produit=[tableau[numero][0],tableau[numero][1],quantite]
            panier.push(produit)
            sauvegarderPanier()
            alert("Produit ajouté avec succes")
        }
    }
}
populaires=document.getElementsByClassName("pop")
for(i=0;i<populaires.length;i++){
    lien=populaires[i].getElementsByTagName("a")[0]
    lien.addEventListener("click",choixprod(i))
}
