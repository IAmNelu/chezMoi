'use strict'

const product = `
<header class="main_location_pic">
        <button class="previous round px-2 py-1 ml-3 mt-3" id="back">
            <i class="fa fa-arrow-left " aria-hidden="true"></i>
        </button>

        <!-- <img class="main_location_pic" src="./images/app_cooking_mama.jpg" alt="Cooking Mama User Appertment"> -->
    </header>
    <div class="avatar_profile "></div>
    <div class="container margin_bootom_big margin_centered">

        <div class="margin_bootom_medium">
            <article>
                <div class="row">
                    <div class="col-12 text-center">
                        <span>
                            <i class="fa fa-heart-o text-left fa-2x" id="favourite" aria-hidden="true"></i>
                            <h1 class="profile_name text-center">
                                Chicken
                            </h1>
                        </span><br>
                        <div class="text-center">
                            <i class="fa fa-clock-o"></i>20:00 -
                            <i class="fa fa-calendar"></i> 15/01/2021<br>
                            <i class="fa fa-map"></i> 221b, Baker Street
                        </div>

                    </div>
                </div>
            </article>
        </div>
        <article>
            <header class="text-center">
                <h4> Meal description & Menu</h4>
            </header>
            <div id="Description">
                <div class=" text-justify ">
                    <p class="px-2 ">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui suscipit reiciendis at possimus
                        blanditiis soluta, maiores est, placeat praesentium, omnis ut minima vero. Animi explicabo cum
                        sit
                        iusto laborum vel eius libero eos ipsa aliquam harum amet, minima, iure pariatur nostrum nihil
                        consequuntur, enim debitis similique. Quam quidem, culpa ipsa assumenda explicabo numquam
                        reprehenderit asperiores recusandae soluta, fugiat iste hic. Nisi obcaecati iusto explicabo
                        atque
                        illo labore eligendi asperiores repellendus? Suscipit veniam, non deserunt labore sed voluptate,
                        id
                        quam consequuntur illo in sit libero quae reprehenderit sunt? Deserunt, soluta repellendus
                        corrupti
                        fugiat ea doloremque. Commodi iusto alias fugit laborum facere.
                    </p>

                </div>
            </div>
        </article>

        <!-- Map with connection to places in cards -->
        <article>
            <header class="text-center">
                <h4> Where is it?</h4>
            </header>
            <div class="col-12 container-fluid justify-content-center mb-3 mt-3">
                <div id="mapid" style=" height: 300px; max-width: 500px text-center"></div>
            </div>
        </article>

        <article>
            <header class="text-center">
                <h4> Allergenes</h4>
            </header>
            <ul class="text-center">
                <div class="row mx-2">
                    <li class="col-4">Meat</li>
                    <li class="col-4">Meat</li>
                    <li class="col-4">Meat</li>
                    <li class="col-4">Meat</li>
                    <li class="col-4">Meat</li>
                </div>
            </ul>
        </article>
    </div>
    <footer class="fixed-bottom">
        <nav class="navbar-light bg-light fixed-bottom ">
            <div class="container py-3">
                <div class="row ">
                    <div class="col text-center" id="price"><i class="fa fa-euro btn_ico" aria-hidden="true"></i><br>10€
                    </div>
                    <div class="col text-center" id="guests"><i class="fa fa-users btn_ico" aria-hidden="true"></i><br>
                        2/4
                    </div>
                    <div class="col text-center" id="book"><i class="fa fa-sign-in btn_ico" aria-hidden="true"></i><br>Book
                    </div>
                </div>
            </div>
        </nav>
    </footer>
`