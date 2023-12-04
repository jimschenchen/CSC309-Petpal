import Sidebar from '../../components/Sidebar';
import Search from '../../components/Search';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Home = () => {
    return (<>
        <Header userType='shelter' username='happy'/>
        <div className="flex h-screen bg-background">
            <Sidebar />
            <Search />
        </div>
        <Footer userType='guest'/>
    </>);
}

export default Home;