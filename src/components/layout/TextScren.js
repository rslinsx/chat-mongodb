import styles from "./TextScren.module.css";

function TextScren({text}){
    return(
        <div className={styles.textScren}>
            <p>{text}</p>
        </div>
    );
};

export default TextScren;