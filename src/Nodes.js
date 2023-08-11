export default function Nodes({ $target, initialState, onClick, onPrevClick }) {
    const $nodes = document.createElement('div')
    $target.appendChild($nodes)
    $nodes.classList.add('nodes')

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        const { isRoot, nodes } = this.state

        $nodes.innerHTML = `
            ${isRoot ? '' : `
                <div class="Node">
                    <img src="https://cat-photos-dev-serverlessdeploymentbucket-fdpz0swy5qxq.s3.ap-northeast-2.amazonaws.com/public/images/prev.png">
                </div>
            `}
            ${nodes.map(node => `
                <div class="Node" data-id="${node.id}">
                    <img src="${node.type === "DIRECTORY" ?
                        "https://cat-photos-dev-serverlessdeploymentbucket-fdpz0swy5qxq.s3.ap-northeast-2.amazonaws.com/public/images/directory.png" :
                        "https://cat-photos-dev-serverlessdeploymentbucket-fdpz0swy5qxq.s3.ap-northeast-2.amazonaws.com/public/images/file.png"
                }">
                ${node.name}
                </div>
            `).join('')}
        `
    }

    this.render()

    $nodes.addEventListener('click', e => {
        const $node = e.target.closest('.Node')

        const { id } = $node.dataset

        // id가 없는 경우
        if (!id) {
            // 뒤로가기 누른 것 처리
        }

        console.log(id)
        const node = this.state.nodes.find(node => node.id === id)

        if (node) {
            onClick(node)
        } else {
            //alert('올바르지 않은 Node 입니다.')
            onPrevClick()
        }
    })
}