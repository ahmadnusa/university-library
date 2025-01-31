import BookOverview from "@/components/BookOverview"
import BookList from "@/components/BookList"
import { sampleBooks } from "@/constans"

const Home = () => (
  <>
    <BookOverview {...sampleBooks} />
    <BookList
      title="Latest Books"
      books={sampleBooks}
      containerClassName="mt-28"
    />
  </>
)

export default Home
