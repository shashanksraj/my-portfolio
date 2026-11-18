import CodeSnippet from '../../components/CodeSnippet'
import DetailSection from '../../components/DetailSection'
import FlowDiagram from '../../components/FlowDiagram'
import ProjectLinks from '../../components/ProjectLinks'
import ProjectPageLayout from '../../components/ProjectPageLayout'
import { TermList } from '../../components/ProjectBlocks'
import type { Project } from '../../data/projects'
import {
  declarationChecks,
  frameLoads,
  symbolEntry,
} from './compilerExcerpts'

function CompilerPage({ project }: { project: Project }) {
  return (
    <ProjectPageLayout project={project}>
      <DetailSection title="Overview">
        <div className="prose">
          <p>
            This is a compiler for a subset of C--, a small C-like language,
            written in C for a university course (CSC 453). It reads a program,
            builds a syntax tree, checks declarations, and generates MIPS
            assembly.
          </p>
          <p>
            A compiler is a good systems exercise because every stage depends
            on the one before it. The code generator is only as correct as the
            tree the parser built and the declarations that were checked
            along the way.
          </p>
        </div>
      </DetailSection>

      <DetailSection title="Compiler Pipeline" wide>
        <FlowDiagram
          label="Compiler pipeline stages"
          caption="The stages a program passes through, from source text to MIPS assembly."
          steps={[
            { title: 'Source Program', note: 'C-like language', endpoint: true },
            { title: 'Scanner', note: 'Source text to tokens' },
            {
              title: 'Parser',
              note: 'Recursive descent, declaration checks',
            },
            { title: 'Syntax Tree', note: 'One AST per function' },
            {
              title: 'Code Generation',
              note: 'Three-address code, then MIPS',
            },
            { title: 'MIPS Assembly', note: 'Compiler output', endpoint: true },
          ]}
        />
      </DetailSection>

      <DetailSection title="How It Works">
        <TermList
          items={[
            {
              term: 'Scanner',
              description:
                'A hand-written scanner groups characters into tokens and tracks line numbers, which the later stages use in error messages.',
            },
            {
              term: 'Recursive-descent parser',
              description:
                'The parser follows the grammar with one function per rule and builds an abstract syntax tree for each function, covering assignments, conditionals, loops, returns, and calls.',
            },
            {
              term: 'Declaration checking',
              description:
                'With the --chk_decl flag, the compiler reports duplicate global, function, and local declarations, undeclared variables and function calls, a function used as a variable (or the reverse), and calls with the wrong number of arguments. Each message includes the line number.',
            },
            {
              term: 'Symbol tables',
              description:
                'Code generation keeps separate global and local symbol tables, with entries for variables, parameters, temporaries, and constants. Local and global names are resolved separately.',
            },
            {
              term: 'Three-address code',
              description:
                'Each function’s tree is lowered into a list of three-address instructions: assignment, arithmetic, parameter pushes, calls, labels, jumps, branch-if-zero, and return. Conditionals, loops, and short-circuit && and || all become labels and branches.',
            },
            {
              term: 'Stack frames',
              description:
                'Each function gets a prologue that saves the frame pointer and return address and reserves space for its locals. Arguments are pushed by the caller and read at positive offsets from the frame pointer; locals sit at negative offsets.',
            },
            {
              term: 'Running it',
              description:
                'Running make builds the compile binary. Flags select the work done: --chk_decl for declaration checks, --print_ast to print each function’s tree, and --gen_code to emit MIPS.',
            },
          ]}
        />
      </DetailSection>

      <DetailSection title="Code Exploration" wide>
        <div className="block-stack">
          <CodeSnippet
            title="Declaration checking"
            filename={declarationChecks.filename}
            code={declarationChecks.code}
            sourceUrl={declarationChecks.sourceUrl}
            explanation="Checks a function call against what was declared: a local name, a variable, an undeclared name, or the wrong number of arguments."
          />
          <CodeSnippet
            title="Symbol table entry"
            filename={symbolEntry.filename}
            code={symbolEntry.code}
            sourceUrl={symbolEntry.sourceUrl}
            explanation="One entry type covers variables, parameters, temporaries, and constants, kept in linked lists."
          />
          <CodeSnippet
            title="Reading operands from the stack frame"
            filename={frameLoads.filename}
            code={frameLoads.code}
            sourceUrl={frameLoads.sourceUrl}
            explanation="Chooses the MIPS load for each kind of symbol: an immediate, a global by label, a parameter above the frame pointer, or a local below it."
          />
        </div>
      </DetailSection>

      <DetailSection title="What I Built">
        <div className="prose">
          <p>
            This was a course project with starter code. The driver, the AST
            header and printer, and the scanner header came from the course.
            I wrote the scanner, the parser, the AST construction, the
            declaration checks, and the code generator.
          </p>
        </div>
      </DetailSection>

      <DetailSection title="Source Code">
        <ProjectLinks project={project} />
      </DetailSection>
    </ProjectPageLayout>
  )
}

export default CompilerPage
