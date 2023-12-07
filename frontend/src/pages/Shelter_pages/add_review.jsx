import ReviewCreation from '../../components/Shelter/DetailPage/ReviewAdd';
import PageFrame from "../../components/PageFrame";


const AddReview = () => {

    return (
        <PageFrame>
            <body className="bg-background">

                <main className="mt-0 p-6">
                    <ReviewCreation/>
                </main>
            </body>
        </PageFrame>


    );
};

export default AddReview;