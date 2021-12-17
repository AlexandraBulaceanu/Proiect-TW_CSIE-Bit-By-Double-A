# Proiect-TW_CSIE-Bit-By-Double-A

# Aplicație web pentru partajarea experiențelor utilizării mijloacelor de transport

Obiectiv
        
    Realizarea unei aplicații web prin care utilizatorii pot împărtăși experiența din urma utilizării unuia din mijloacele de transport în comun.

Descriere
    
    Aplicația trebuie să permită crearea unui cont prin care utilizatorul poate să partajeze o experiență, după ce a folosit un mijloc de transport în comun. Pentru utilizatorii anonimi, aplicația va permite căutarea și vizualizarea intrărilor în platforma.

Tehnologii utilizate

    Backend: Node.js + REST API
    Frontend: React.js
    Database: MySQL
    ORM: Sequelize

Functionalitati - Must Have
        
    General
    
        P1: Creare sectiune de home - Front
        P1: Creare sectiune de autentificare: 2 optiuni (utilizatori anonimi sau utilizatori cu cont) - Front
        P1: Creare sectiune pentru partajarea experientei in mijlocul de transport - Front
        P1: Creare formular pentru editarea experientei + adaugarea ei + stergerea
        P1: Creare sectiune pentru cautare (search bar) - Front 
        
    Modulul Utilizator
        P1: Creare cont utilizator pe baza unor câmpuri sau cu ajutorul unui API extern (GMAIL, Facebook, Linkedin) - Back + Database
        P2: Modificarea sau dezactivarea contului - Back + Database
        P2: Resetarea parolei - Back + Database

    Modulul de Partajare
        P1: Crearea unei experiențe presupune completarea următoarelor câmpuri: - Back + Database | Create
            Punctul de plecare (A)
            Punctul de sosire (B)
            Mijlocul de transport folosit: bus, metro, tram, etc.
            Ora plecare
            Durata călătoriei
            Gradul de aglomerare al mijlocului de transport
            Observații
            Nivelul de satisfacție (smiley faces)
        P1: Modificarea intrărilor specifice utilizatorului (editarea unei postari anterioare) - Back + Database | Update
        P1: Listarea tuturor experiențelor create de un utilizator - Back + Database | Read
        P2: Ștergerea unei experiențe - Back + Database | Delete

    Modulul de Căutare 
        P1: Modulul de căutare va trebui să permită utilizatorului introducerea unor cuvinte cheie, după care vor fi afișate rezultatele, sub formă de listă. - Back + Database
        P2: Modulul va trebui să returneze rezultate relevante în funcție de locație, mijlocul de transport folosit sau destinație (sortare dupa mai multe criterii) - Back + Database


Functionalitati - Nice to have
   
    General
        P3: Creare sectiune de semnalizare evenimente - Front

    Semnalare de catre utilizatori a urmatoarelor aspecte - pt ambele tipuri de utilizatori
        P3: prezenta controlorilor pe o anumita ruta intr-un anumit interval de timp (cum e la waze cu politia) - Back + Database
        P3: modificarea pretului/ a politicii legate de abonamente - Back + Database 
        P3: evenimente produse pe o anumita ruta intr-un anumit interval de timp (de ex intarzieri, blocaje, accidente etc) - Back + Database

Teste - optional
   
    Test coverage

Semnificatie prioritati

        P1 - importanta majora
        P2 - importanta medie
        P3 - importanta scazuta

Studenti - grupa 1080

    Baltatu Maria-Andreea
    Bulaceanu Alexandra-Irina

Profesor Coordonator

    Toma Andrei
    
Instructiuni rulare

        npm install
        npx sequelize-cli migrate
        npx sequelize-cli seed:all
        npm start
