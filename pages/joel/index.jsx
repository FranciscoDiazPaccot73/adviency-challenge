import { generateFiles } from "../../utils"

const Joel = () => {
  return (
    <div>Joel</div>
  )
}

export async function getStaticProps(context) {
  generateFiles('joel')

  return {
    props: {},
  }
}

export default Joel;