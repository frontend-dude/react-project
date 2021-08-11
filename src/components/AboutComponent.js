import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components'

function RenderLeader({ leader }) {
    if (leader != null)
        return (
            <>
                {/* Fetching the image from baseUrl (json-server) */}
                <Media object className="mr-3" src={baseUrl + leader.image} alt={leader.name} height="100em" />
                <Media body>
                    <CardTitle className="mt-0">{leader.name}</CardTitle>
                    <CardText> {leader.abbr}, {leader.designation}</CardText>
                    <CardText>{leader.description}</CardText>
                </Media>
            </>
        );
    else
        return (
            <div></div>
        );
}


const About = (props) => {
    const LeaderManage = () => {
        if (props.leaders.isLoading) {
            return (
                <Loading />
            )
        }
        else if (props.leaders.errMess) {
            return (
                <CardTitle>{props.leaders.errMess}</CardTitle>
            )
        }
        else
            return (
                <Media list>
                    <Stagger in>
                        {props.leaders.leaders.map((leader) => {
                            return (
                                <Fade>
                                    <div key={leader.id} className="row col-12 mt-3">
                                        <RenderLeader leader={leader} />
                                    </div>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </Media>
            )
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <CardTitle>About Us</CardTitle>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <CardTitle>Our History</CardTitle>
                    <CardText>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us. </CardText>
                    <CardText>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</CardText>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <CardText className="mb-0">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</CardText>
                                <footer className="blockquote-footer">Yogi Berra,
                                    <cite title="Source Title"> The Wit and Wisdom of Yogi Berra,
                                        P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <CardTitle>Corporate Leadership</CardTitle>
                </div>
                <div className="col-12">
                    <LeaderManage />
                </div>
            </div>
        </div>
    );
}

export default About;