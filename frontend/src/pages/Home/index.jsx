import Sidebar from '../../components/Sidebar';
import Search from '../../components/Search';
import PageFrame from '../../components/PageFrame';
import { getUser } from '../../utils/credential';

const Home = () => {
    return (
    <PageFrame userType='guest'>

        <div className="flex h-screen bg-background">
            <Sidebar />
            <Search />
        </div>
    </PageFrame>);
}

export default Home;