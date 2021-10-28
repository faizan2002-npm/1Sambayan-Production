import React from 'react'
import PublicLayout from './../../layouts/Public/PublicLayout';
import images from "../../Constants/Admin/images";

const Participate = () => {
    return (
        <PublicLayout>
        <main id="main_content">
            <section className="section-6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg col-md-3 col-12">
                            <img src={images.Mobile1} className="img-fluid img" alt=""/>
                            <div className="div1">
                                1
                            </div>
                            <div>
                                <h5 className="h51">
                                    Download the 1SAMA <br/>
                                    AKO app
                                </h5>
                                <p className="p1">
                                    Using your mobile phone, open your
                                    AppStore (on your Apple Devices) or
                                    PlayStore (on your Android devices)
                                    and search, download and install the
                                    1Sama Ako app
                                </p>
                            </div>
                        </div>
                        <div className="col-lg col-md-3 col-12">
                        <img src={images.Mobile1} className="img-fluid img" alt=""/>
                            <div className="div1">
                                2
                            </div>
                            <div>
                                <h5 className="h51">
                                    Enter personal details
                                </h5>
                                <p className="p2">
                                    You might receive a message
                                    from 1Sambayan’s Membership
                                    Committee directing you to groups
                                    or working committees depending
                                    on your entry on “HOW YOU WANT
                                    TO BE INVOLVED”.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg col-md-3 col-12">
                        <img src={images.Mobile1} className="img-fluid img" alt=""/>
                            <div className="div1">
                                3
                            </div>
                            <div>
                                <h5 className="h51">
                                    Invite others
                                </h5>
                                <p className="p2">
                                    If the person you are inviting is
                                    beside you, share the QR Code. He
                                    can use his phone’s camera to scan
                                    the QR Code. Otherwise, SHARE
                                    LINK via email, messenger or chat.
                                    If people use your link, they will be
                                    registered as your recruits.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg col-md-3 col-12">
                        <img src={images.Mobile1} className="img-fluid img" alt=""/>
                            <div className="div1">
                                4
                            </div>
                            <div>
                                <h5 className="h51">
                                    What your profile means
                                </h5>
                                <p className="p2">
                                    You earn points by:
                                </p>
                                <ul>
                                    <li>
                                        Recruiting (use the SHARE APP
                                        LINK to do this)
                                    </li>
                                    <li>
                                        Donating (feature to be added in
                                        future releases)
                                    </li>
                                    <li>
                                        Participating in campaigns
                                        (feature to be added in future
                                        releases)
                                    </li>
                                </ul>
                                <p className="p2">
                                    You also have a share of points
                                    earned by your recruits and their
                                    recruits (downline) as shown in the
                                    GENEALOGY. As you earn points,
                                    you move up the rank according to
                                    following:
                                </p>
                                <img src={images.Table} className="" alt=""/>
                            </div>
                        </div>
                        <div className="col-lg col-md-3 col-12">
                        <img src={images.Mobile1} className="img-fluid img" alt=""/>
                            <div className="div1">
                                5
                            </div>
                            <div className="div2">
                                <h5 className="h51">
                                    What your profile means
                                </h5>
                                <p className="p2">
                                    You earn points by:
                                </p>
                                <ul>
                                    <li>
                                        Recruiting (use the SHARE APP
                                        LINK to do this)
                                    </li>
                                    <li>
                                        Donating (feature to be added in
                                        future releases)
                                    </li>
                                    <li>
                                        Participating in campaigns
                                        (feature to be added in future
                                        releases)
                                    </li>
                                </ul>
    
                                <p className="p2">
                                    We will add your Group Short Name
                                    to the choices when people register
                                    We will also send your Admin a link
                                    to your Admin Dashboard so you
                                    can approve or delete members
                                    choosing your Group Short Name
                                    When the MESSAGING feature is
                                    operational, you can use the APP
                                    for exclusive messaging for your
                                    GROUP
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </PublicLayout>
    )
}

export default Participate
