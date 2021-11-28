
import Header from '../../components/Public/Headers/Header';
import Footer from '../../components/Public/Footers/Footer';
import "../../assets/scss/Public/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-phone-input-2/lib/style.css'

const PublicLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default PublicLayout
