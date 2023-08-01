// eslint-disable-next-line import/no-anonymous-default-export
export default `
@top Program { expression* }

expression {
  brackets |
  Identifier |
  Keyword
}

@tokens {
  Identifier { ![ )(] }
  brackets { "(" | ")" }
  And { " "("a"|"A")("n"|"N")("d"|"D")" " }
  Not { " "("n"|"N")("o"|"O")("t"|"T")" " }
  Or { " "("o"|"O")("r"|"R")" " }
  Adj { " "("a"|"A")("d"|"D")("j"|"J")($[0-9])?($[0-9])?" "  }
  Near { " "("n"|"N")("e"|"E")("a"|"A")("r"|"R")($[0-9])?($[0-9])?" "  }
  Same { " "("s"|"S")("a"|"A")("m"|"M")("e"|"E")" "  }
  Keyword { And | Or | Not | Adj | Near | Same  }
  @precedence { Identifier, Keyword }

}


@detectDelim
`;
