type Term = { name: string; value: string | number };

type FilterOptions = {
  /**
   * Separator to split search terms.
   * by default is '`,`' (coma)
   */
  separator?: string | RegExp
}

class Filter<Data> {
  private data: Data[];

  private terms: Term[];

  private results: Promise<Data[]> | null;

  private options: FilterOptions = {
    separator: ',',
  };

  constructor(data: Data[], options?: FilterOptions) {
    this.data = data;
    this.terms = [];
    this.results = null;
    this.options = options || this.options;
  }

  from(search: string, keys: string) {
    const sanitize = (str: string): string => str.toLowerCase().trim();
    const keysArr = keys.split(this.options.separator || ',');
    const searchArr = search.split(this.options.separator || ',');
    this.terms = searchArr.map((searchTerm, index) => ({
      name: sanitize(keysArr[index] || keysArr[0]),
      value: sanitize(searchTerm),
    }));
    return this;
  }

  where(predicate: (term: Term, data: Data, index: number) => boolean) {
    this.results = new Promise((resolve, reject) => {
      try {
        const res = this.data.filter((data, index) => this.terms.every((term) => predicate(
          term,
          data,
          index,
        )));
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
    return this;
  }

  async exec() {
    return this.results?.then((data) => data).catch((reason) => new Error(reason)) || null;
  }
}

export default Filter;
