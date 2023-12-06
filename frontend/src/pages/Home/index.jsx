import Sidebar from '../../components/Sidebar';
import Search from '../../components/Search';
import PageFrame from '../../components/PageFrame';

const Home = () => {
    return (
    <PageFrame>
        <div className="px-2 flex h-[calc(100vh-5.5rem)] lg:h-[calc(100vh-5.5rem)] bg-background">
            <Sidebar />
            <Search />
        </div>
    </PageFrame>);
}

export default Home;