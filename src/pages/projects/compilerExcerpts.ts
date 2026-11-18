// Verbatim excerpts from https://github.com/shashanksraj/c-minus-compiler
// (branch: main). Each file below is credited to Shashank Raj Pitla in its
// header comment. Keep these in sync with the repository, and do not edit the
// code itself. String.raw keeps the C escape sequences (\n) exactly as written.

const REPO = 'https://github.com/shashanksraj/c-minus-compiler/blob/main'

export const declarationChecks = {
  filename: 'parser.c, lines 178–203',
  sourceUrl: `${REPO}/parser.c#L178-L203`,
  code: String.raw`static void check_func_with_args(const char *name, int argc) {
    if (!chk_decl_flag || err_stat) return;

    if (strcmp(name, "println") == 0) return;

    if (list_present(locals, name)) {
        fprintf(stderr, "ERROR: illegal call to local name %s (LINE %d)\n", name, currLine);
        err_stat = 1;
        return;
    }
    Node *fun = list_get(funcs, name);
    if (!fun) {
        if (list_present(globs, name)) {
            fprintf(stderr, "ERROR: identfier '%s' declared as var but used as function (LINE %d)\n", name, currLine);
        } else {
            fprintf(stderr, "ERROR: undeclared function call %s (LINE %d)\n", name, currLine);
        }
        err_stat = 1;
        return;
    }
    if (fun->args != argc) {
        fprintf(stderr, "ERROR: function '%s' called with %d args but declared with %d (LINE %d)\n", name, argc,
            fun->args, currLine);
        err_stat = 1;
    }
}`,
}

export const symbolEntry = {
  filename: 'codegen.c, lines 20–30',
  sourceUrl: `${REPO}/codegen.c#L20-L30`,
  code: String.raw`typedef struct Symbol {
    char *name;
    int offset;
    int is_temp;
    int is_const;
    int is_global;
    int value;
    int is_param;
    int param_index;
    struct Symbol *next;
} Symbol;`,
}

export const frameLoads = {
  filename: 'codegen.c, lines 468–481',
  sourceUrl: `${REPO}/codegen.c#L468-L481`,
  code: String.raw`static const char *load_symbol(Symbol *s, const char *reg) {
    if (s->is_const) {
        printf("    li %s, %d\n", reg, s->value);
    } else if (s->is_global) {
        printf("    la %s, _%s\n", reg, s->name);
        printf("    lw %s, 0(%s)\n", reg, reg);
    } else if (s->is_param) {
        int off = 8 + 4 *  s->param_index;
        printf("    lw %s, %d($fp)\n", reg, off);
    } else {
        printf("    lw %s, %d($fp)\n", reg, s->offset);
    }
    return reg;
}`,
}
