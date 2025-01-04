import './Parts.css'

function redirectGit(){
    window.location.href = 'https://github.com/eu-lucasweber/'
}

function Footer(){
    return(
        <div className="Footer">
            <p className="link" onClick={redirectGit}>by Lucas Weber</p>
        </div>
    )
}

export default Footer;