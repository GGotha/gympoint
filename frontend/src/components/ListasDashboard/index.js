import React, { Component } from "react";

import { Listas, LinkMeetups } from "./styles";

import { FaAngleRight, FaBlackTie } from "react-icons/fa";

import moment from "moment";
import "moment/locale/pt-br";

const ListasDashboard = ({ meetups, link }) => (
  <div>
    {meetups.map(lista => (
      <Listas>
        <ul>
          <LinkMeetups to={`/detalhes/${lista.id}`}>
            <li>
              <span>{lista.titulo}</span>
              <p>
                {moment(lista.data)
                  .locale("pt-br")
                  .format("DD MMMM, [às] HH:mm")}
                <span>
                  <FaAngleRight />
                </span>
              </p>
            </li>
          </LinkMeetups>
        </ul>
      </Listas>
    ))}
  </div>
);

export default ListasDashboard;
