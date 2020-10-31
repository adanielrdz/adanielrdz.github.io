// erik cavazos, last modified 02/10/2020
                // script to get up to 4 most recent articles from the blog and insert them in the page
                onload = getLastArticles();
                class Article {
                    
                    constructor(_name, _description, _link){
                        this.name = _name;
                        this.description = _description;
                        this.link = _link;
                    }
                    get name() {
                        return this.name;
                    }
                    get description() {
                        return this.description;
                    }
                    get link(){
                        return this.link;
                    }
                }
                function getLastArticles() {
                    const lastArticlesURL = "https://beartec.azurewebsites.net/api/GetLastArticles";
                    const http = new XMLHttpRequest();

                    http.open("GET", lastArticlesURL);
                    http.timeout = 35000; // 20s
                    http.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            var jsonResponse = JSON.parse(this.responseText);
                            var blogEntriesContainer = document.getElementById("blog-entries-container");
                            blogEntriesContainer.innerHTML = "";
                            for (i = 0; i < jsonResponse.length; i++) {
                                let articulo = new Article(
                                    jsonResponse[i].titulo,
                                    jsonResponse[i].descripcion,
                                    jsonResponse[i].link
                                );
                                
                                console.log("Titulo: " + articulo.name);
                                console.log("Descripcion: " + articulo.description);
                                console.log("Link: " + articulo.link);
                                /*
                                make this with js
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Special title treatment</h5>
                                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                                */
                                // create empty div for card
                                var cardElement = document.createElement("div");
                                cardElement.classList.add("card");
                                cardElement.classList.add("custom-card-blog-entry");
                                cardElement.classList.add("bg-dark");
                                cardElement.classList.add("text-white");
                                
                                // create empty div for card-body
                                var cardBodyElement = document.createElement("div");
                                cardBodyElement.classList.add("card-body");

                                // create h5 for title that goes into card-body
                                var h5Element = document.createElement("h5");
                                h5Element.classList.add("card-title");

                                // create p element that goes into card-body
                                var pElement = document.createElement("p");
                                pElement.classList.add("card-text");

                                // create a element that goes into card-body
                                var aElement = document.createElement("a");
                                aElement.classList.add("m-3");

                                // fill in h5, p and a
                                h5Element.innerText = articulo.name;
                                pElement.innerText = articulo.description;
                                aElement.innerText = "Leer más";
                                aElement.setAttribute("href",articulo.link);

                                // put h5, p and a into card-body
                                cardBodyElement.appendChild(h5Element);
                                cardBodyElement.appendChild(pElement);
                                cardBodyElement.appendChild(aElement);

                                // put resultant card-body into card
                                cardElement.appendChild(cardBodyElement);

                                // put card into container
                                
                                blogEntriesContainer.appendChild(cardElement);
                            }
                        }else{
                            var blogEntriesContainer = document.getElementById("blog-entries-container");
                            var errorMsg = document.createElement("div");
                            errorMsg.classList.add("alert");
                            errorMsg.classList.add("alert-danger");
                            errorMsg.classList.add("w-100");

                            errorMsg.innerHTML = '<i class="fas fa-sad-tear"></i> Error al conectar con el blog';
                            blogEntriesContainer.innerHTML = "";
                            blogEntriesContainer.appendChild(errorMsg)
                        }
                    }
                    http.send();
                }