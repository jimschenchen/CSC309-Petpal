import Sidebar from '../../components/Sidebar';
import Search from '../../components/Search';

const Home = () => {
    return <>
        <div class="flex h-screen background">
            <Sidebar />
            <Search />
        </div>
    </>;
}

export default Home;