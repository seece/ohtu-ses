# ses miniprojektiraportti

Pekka Väänänen
Teemu Sarapisto


##Intro
(mini)Ohjelmistoprojektimme oli tavallaan varsin onnistunut simuloimaan oikeaa projektia, sillä olosuhteet muuttuivat jatkuvasti. Tiimin odotettu koko vaihtui käytännössä joka sprintiin. Valitut työkalut olisivat toimineet hyvin isompaankin projektiin, saimme niillä taattua ohjelmistokokonaisuuden toteutettujen ominaisuuksien laadun, sekä sen, että ohjelmisto on helposti jatkokehitettävissä. 

## Sprint 1
Ensimmäisen sprintin aikana ongelmana oli uusi teknologia joillekin ryhmän jäsenille. Lisäksi sprintin aikana ryhmään liittyi uusi jäsen Juhani. Asiakastapaamisessa sovimme sprintiin toteutettavat user storyt, mutta emme jakaneet niitä välittömästi teknisiksi taskeiksi, mikä oli virhe. Tämä olisi helpottanut node.js:ää tuntemattomien ryhmän jäsenten osallistumista, sillä työ olisi ollut tällöin jaoteltuna pienempiin osiin.

Pohjakoodi saatiin ajoissa valmiiksi, mutta lopullinen työskentely ennen asiakastapaamista jäi viime tinkaan, työnjako ei siis toiminut.

Saimme työympäristön pystytettyä sisältäen gittirepot ja CI-palvelimet, barebones serverisoftan ja joitakin placeholder testejä CI:n testaamiseksi.

## Sprint 2
Toiseen sprinttiin saimme viitteiden lisäämisen lomakkeen kautta, kenttien validoinnin ja yksittäisen article-viitteen tarkastelun. Pekka ja Teemu tekivät käytännössä kaiken työn, ja Juhani laati tietokantaskeeman. Ryhmän neljännestä jäsenestä Kimistä ei oikeen kuulunut enää mitään.

Työskentely sujui tässä vaiheesa paremmin viikottaisen 4h-rajoitteen mukaan, eikä sitä tehty viime tingassa. Teknisiin taskeihin jakaminen auttoi hommien aloittamista selkeästi.

## Sprint 3

Kolmannessa sprintissä valmistui suurin osa demossa esitellyistä ominaisuuksista. Viitteitä pystyi nyt hakemaan, muuttamaan ja poistamaan. Tämän työn tekivät jälleen Pekka ja Teemu. Kim sanoi yrittävänsä tehdä burndown chartin, mutta myöhemmin jätti ilmeisesti kurssin kesken. Juhani ei osallistunut tähän sprinttiin. Työaikaa kului hieman yli 4h per henkilö, ja lisäksi työtä tehtiin vasta sprintin lopussa, joten ajanhallinta ei sujunut aivan toivotusti.

## Demo
Demossa ilmeni huojennukseksemme, että muutkaan eivät olleet saaneet aivan kaikkea toteutettua, ja varsinkin huomioonottaen tiimimme pienen koon tulosta oli tullut varsin hyvin. Uskoaksemme saimme demossa tehokkaasti osoitettua mitä meillä on valmiina ja mitä ei.

## Tech stack
Käytetyiksi teknologioiksi valikoitui ensimmäisen sprintin aikana varsin toimivat työkalut. 

####Jade HTML template enginellä
saatiin vähennettyä toisteista HTML:ää huomattavasti ja sivuista dynaamisia. 

####BDD ja testaus
hoidettiin yhdistämällä kirjastot should, mocha, supertest. Should auttoi tekemään testeistä luettavampia ihmiselle. Mocha hoiti testien ajamisen ja nätin tulostuksen. Supertest oli erityisen kätevä. Sillä saimme testattua mm. sen, että serveri palauttaa oikeasta osoitteesta oikeasisältöistä HTML:ää oikealla statuskoodilla ilman, että näitä tarvitsisi käsin kokeilla. Supertest auttoi myös sen testaamisessa, että HTTP POSTit oikeaan osoitteeseen oikeasti toimivat ja lisäävät tietokantaan dataa.

####Back-end
hoitui Node.JS:llä. Hukkasimme aikaa ensimmäisestä sprintistä yrittämällä löytää sille hyviä perus crud-kirjastoja, mutta päädyimmekin kirjoittamaan kaikki routejen sisällöt itse. Express kirjasto helpoitti taakkaa sen verran, että routet pystyttiin luomaan vain kuvailemalla ne tyyliin "polku"->routen-käsittelevä-funktio.

## Lopuksi

### Mikä meni huonosti
Vaikka tuotteesta valmistui jonkinlainen versio, ei se täyttänyt kaikkia asiakkaan toivomia vaatimuksia. Toteutetut vaatimukset kuitenkin olivat definition of donen mukaisia. Työskentely olisi ollut varmasti tehokkaampaa jos User Storyt olisi jaettu heti alusta alkaen kurinalaisesti taskeihin, ja koko backlog olisi estimoitu, jolloin olisi ollut selvää kuinka paljon sprintteihin varattua työtä oltiin tekemässä. Myös tiimin sisäisessä kommunikaatiossa oli puutteita, eikä kaikilla ollut kaikkina ajan hetkinä tietoutta mitä heidän olisi pitänyt olla tekemässä. Tämä toisaalta voitakoon ottaa opetuksena siitä, että edes jonkinlainen oma-aloitteisuus on pakollista myös silloin, kun kyseessä on yli yhden hengen toteuttama projekti.

### Mikä meni hyvin
Valittu teknologia oli ihan toimiva, ja luultavasti parempi vaihtoehto kuin esim. Java ja Spring. Huomioonottaen tiimin pienen koon saimme muihin tiimeihin verrattuna varsin hyvin tulosta, vaikka monella muulla tiimillä oli käytössään työkalut joilla kehittämisen nopeutta usein kehutaan maasta taivaisiin. Projekti opetti kiteytetysti varsin hyvin millaista on työskennellä tiimissä projektissa joka yritetään tehdä kunnolla alusta alkaen käyttäen alan tyypillisiä menetelmiä.  
