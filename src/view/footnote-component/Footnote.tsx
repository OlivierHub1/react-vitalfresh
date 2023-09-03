import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithubSquare,
  faGitlabSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

interface Props {
  fixed_bottom: boolean;
}

export const Footnote: React.FC<Props> = ({ fixed_bottom }) => {
  return (
    <footer
      className={"py-3 bg-dark" + (fixed_bottom ? " fixed-bottom" : "")}
    >
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <a href="https://github.com/OlivierHub1" className="nav-link px-2">
            <FontAwesomeIcon icon={faGithubSquare} size="2x" />
          </a>
        </li>
        <li className="nav-item">
          <a
            href="https://www.linkedin.com/in/olivier-registre-sainvilus-b6b7aa280/"
            className="nav-link px-2"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </li>
        <li className="nav-item">
          <a
            href="https://git.dti.crosemont.quebec/oregistresainvilus"
            className="nav-link px-2"
          >
            <FontAwesomeIcon icon={faGitlabSquare} size="2x" />
          </a>
        </li>
      </ul>
      <p className="text-center text-light">
        Olivier Registre Sainvilus - Portfolio
      </p>
    </footer>
  );
};
