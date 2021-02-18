export class DisposalBasket {
  public education: number[] = []
  public links: number[] = []
  public jobs: number[] = []

  clear() {
    this.education.slice(0, this.education.length - 1);
    this.links.slice(0, this.links.length - 1);
    this.jobs.slice(0, this.jobs.length - 1);
  }

  addTOBasket_education(id: number) {
    this.education.push(id);
  }

  addTOBasket_links(id: number) {
    this.links.push(id);
  }

  addTOBasket_jobs(id: number) {
    this.jobs.push(id);
  }
}
