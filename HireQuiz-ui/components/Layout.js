 // components/Layout.js
 // Created by: Parita, Nirav, Pratham, Jay
 // Last Updated by: Nirav, Pratham on May 23
import MainNav from "./MainNav";
import { Container } from "react-bootstrap";

export default function Layout(props) {
    return (
        <>
            <MainNav />
            <Container>{props.children}</Container>
        </>
    );
}